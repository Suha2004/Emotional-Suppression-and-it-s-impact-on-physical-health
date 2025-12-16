from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
import bcrypt
import sqlite3
import json
from pathlib import Path

app = FastAPI(title="EmoCalm Authentication API")

# Configuration
SECRET_KEY = "your-secret-key-here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Initialize password context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

security = HTTPBearer()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DB_PATH = "emocalm_users.db"

def init_db():
    """Initialize SQLite database"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP
        )
    """)
    
    # Chat history table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS chat_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            message TEXT NOT NULL,
            response TEXT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    
    # Assessment history table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS assessment_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            assessment_data TEXT NOT NULL,
            total_score INTEGER,
            severity TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)
    
    conn.commit()
    conn.close()
    print(f"✅ Database initialized at: {Path(DB_PATH).absolute()}")

init_db()

# Pydantic models
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ChatMessage(BaseModel):
    message: str
    response: str

class AssessmentData(BaseModel):
    answers: dict
    total_score: int
    severity: str
    interpretation: str
    recommendations: List[str]

class Token(BaseModel):
    access_token: str
    token_type: str
    user: dict

# Helper functions
def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    """Verify password against hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token: str):
    """Decode JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user from token"""
    token = credentials.credentials
    payload = decode_token(token)
    email = payload.get("sub")
    if email is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, email, name FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()
    
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    
    return {"id": user[0], "email": user[1], "name": user[2]}

# API Endpoints
@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "EmoCalm Authentication API",
        "version": "1.0.0",
        "endpoints": {
            "POST /register": "Register new user",
            "POST /login": "Login user",
            "GET /me": "Get current user",
            "GET /chat-history": "Get chat history",
            "POST /chat-history": "Save chat message",
            "GET /assessment-history": "Get assessment history",
            "POST /assessment-history": "Save assessment"
        }
    }

@app.post("/register", response_model=Token)
def register(user: UserRegister):
    """Register new user"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # Check if user exists
        cursor.execute("SELECT id FROM users WHERE email = ?", (user.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Hash password and create user
        password_hash = hash_password(user.password)
        cursor.execute(
            "INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)",
            (user.email, password_hash, user.name)
        )
        conn.commit()
        user_id = cursor.lastrowid
        conn.close()
        
        # Create token
        access_token = create_access_token(
            data={"sub": user.email},
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        
        print(f"✅ New user registered: {user.email}")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {"id": user_id, "email": user.email, "name": user.name}
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Registration error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/login", response_model=Token)
def login(user: UserLogin):
    """Login user"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute("SELECT id, email, password_hash, name FROM users WHERE email = ?", (user.email,))
        db_user = cursor.fetchone()
        
        if not db_user or not verify_password(user.password, db_user[2]):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        # Update last login
        cursor.execute("UPDATE users SET last_login = ? WHERE id = ?", (datetime.now(), db_user[0]))
        conn.commit()
        conn.close()
        
        # Create token
        access_token = create_access_token(
            data={"sub": user.email},
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        
        print(f"✅ User logged in: {user.email}")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {"id": db_user[0], "email": db_user[1], "name": db_user[3]}
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Login error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/me")
def get_user_profile(current_user: dict = Depends(get_current_user)):
    """Get current user profile"""
    return current_user

@app.post("/chat-history")
def save_chat_message(chat: ChatMessage, current_user: dict = Depends(get_current_user)):
    """Save chat message"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO chat_history (user_id, message, response) VALUES (?, ?, ?)",
            (current_user["id"], chat.message, chat.response)
        )
        conn.commit()
        chat_id = cursor.lastrowid
        conn.close()
        
        return {"success": True, "id": chat_id, "message": "Chat saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/chat-history")
def get_chat_history(current_user: dict = Depends(get_current_user)):
    """Get user's chat history"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, message, response, timestamp FROM chat_history WHERE user_id = ? ORDER BY timestamp DESC",
            (current_user["id"],)
        )
        chats = cursor.fetchall()
        conn.close()
        
        return {
            "count": len(chats),
            "chats": [
                {"id": c[0], "message": c[1], "response": c[2], "timestamp": c[3]}
                for c in chats
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/assessment-history")
def save_assessment(assessment: AssessmentData, current_user: dict = Depends(get_current_user)):
    """Save assessment result"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        assessment_json = json.dumps({
            "answers": assessment.answers,
            "interpretation": assessment.interpretation,
            "recommendations": assessment.recommendations
        })
        
        cursor.execute(
            "INSERT INTO assessment_history (user_id, assessment_data, total_score, severity) VALUES (?, ?, ?, ?)",
            (current_user["id"], assessment_json, assessment.total_score, assessment.severity)
        )
        conn.commit()
        assessment_id = cursor.lastrowid
        conn.close()
        
        print(f"✅ Assessment saved for user: {current_user['email']}")
        
        return {"success": True, "id": assessment_id, "message": "Assessment saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/assessment-history")
def get_assessment_history(current_user: dict = Depends(get_current_user)):
    """Get user's assessment history"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, assessment_data, total_score, severity, timestamp FROM assessment_history WHERE user_id = ? ORDER BY timestamp DESC",
            (current_user["id"],)
        )
        assessments = cursor.fetchall()
        conn.close()
        
        return {
            "count": len(assessments),
            "assessments": [
                {
                    "id": a[0],
                    "data": json.loads(a[1]),
                    "total_score": a[2],
                    "severity": a[3],
                    "timestamp": a[4]
                }
                for a in assessments
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*60)
    print("🔐 EmoCalm Authentication Server Starting...")
    print("="*60)
    print(f"📁 Database: {Path(DB_PATH).absolute()}")
    print(f"🌐 API: http://localhost:8001")
    print(f"📚 Docs: http://localhost:8001/docs")
    print("="*60 + "\n")
    uvicorn.run(app, host="0.0.0.0", port=8001)