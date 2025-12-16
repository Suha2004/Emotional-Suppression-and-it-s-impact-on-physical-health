from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import json
from fuzzywuzzy import process
from groq import Groq
import os
from dotenv import load_dotenv
from typing import Optional, List, Dict, Union
from datetime import datetime
import uuid

# Load environment variables
load_dotenv()

# Configure Groq API
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
groq_client = None
if GROQ_API_KEY:
    groq_client = Groq(api_key=GROQ_API_KEY)
    print("✅ Groq API configured")
else:
    print("⚠️ Warning: GROQ_API_KEY not found in .env")

# Initialize FastAPI
app = FastAPI(title="EMO-Calm Chatbot API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data safely
data = []
try:
    with open("mapping1.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"✅ Loaded {len(data)} entries from mapping1.json")
except FileNotFoundError:
    print("⚠️ mapping1.json not found!")
except json.JSONDecodeError as e:
    print(f"⚠️ Error parsing mapping1.json: {e}")

# In-memory conversation storage
conversations = {}

# Models
class Message(BaseModel):
    role: str
    content: str
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    session_id: Optional[str] = None
    user_name: Optional[str] = None

class YouTubeLink(BaseModel):
    title: str
    url: str
    description: str

class ChatResponse(BaseModel):
    reply: str
    session_id: str
    matched_symptom: Optional[str] = None
    physical_cause: Optional[str] = None
    emotional_cause: Optional[str] = None
    healing_tips: Optional[str] = None
    healing_tools: Optional[Union[str, List[str]]] = None
    youtube_links: Optional[List[Dict[str, str]]] = None
    conversation_context: Optional[str] = None

ChatResponse.model_rebuild()

class ConversationHistory(BaseModel):
    session_id: str
    messages: List[Message]
    created_at: str
    last_updated: str

# Conversation Management
def get_or_create_session(session_id: Optional[str] = None) -> str:
    """Get existing session or create new one"""
    if session_id and session_id in conversations:
        return session_id
    
    new_session_id = str(uuid.uuid4())
    conversations[new_session_id] = {
        "messages": [],
        "created_at": datetime.now().isoformat(),
        "last_updated": datetime.now().isoformat(),
        "user_name": None
    }
    return new_session_id

def add_message(session_id: str, role: str, content: str):
    """Add message to conversation history"""
    if session_id in conversations:
        conversations[session_id]["messages"].append({
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat()
        })
        conversations[session_id]["last_updated"] = datetime.now().isoformat()

def get_conversation_context(session_id: str, max_messages: int = 6) -> str:
    """Get recent conversation context for AI"""
    if session_id not in conversations:
        return ""
    
    messages = conversations[session_id]["messages"][-max_messages:]
    context = "\n".join([f"{msg['role'].upper()}: {msg['content']}" for msg in messages])
    return context

def get_conversation_summary(session_id: str) -> str:
    """Get a brief summary of the conversation"""
    if session_id not in conversations:
        return "This is the start of our conversation."
    
    messages = conversations[session_id]["messages"]
    if len(messages) == 0:
        return "This is the start of our conversation."
    
    user_messages = [msg for msg in messages if msg["role"] == "user"]
    if len(user_messages) > 1:
        return f"We've been discussing your health concerns. You've mentioned: {', '.join([msg['content'][:30] + '...' if len(msg['content']) > 30 else msg['content'] for msg in user_messages[-3:]])}"
    
    return "Let's continue our conversation about your wellbeing."

# YouTube links generator with personalized messages
def get_youtube_links(symptom: str, healing_tool: str) -> List[Dict]:
    """Generate YouTube search links with personalized messages"""
    base_url = "https://www.youtube.com/results?search_query="
    
    links = []
    
    # Meditation link with personal message
    links.append({
        "title": f"🧘 Meditation for {symptom} Relief",
        "url": f"{base_url}meditation+for+{symptom.replace(' ', '+')}+healing",
        "description": "Here's a calming meditation to help you find peace and relief 🕊️"
    })
    
    # Breathwork link with personal message
    links.append({
        "title": f"🌬️ Breathwork for {symptom}",
        "url": f"{base_url}breathwork+techniques+for+{symptom.replace(' ', '+')}",
        "description": "Here's a breathwork YouTube video for ya! Deep breathing can work wonders ✨"
    })
    
    # Healing tool specific link
    if healing_tool:
        if isinstance(healing_tool, list) and len(healing_tool) > 0:
            tool_name = healing_tool[0]
        elif isinstance(healing_tool, str):
            tool_name = healing_tool.split(',')[0].strip()
        else:
            tool_name = None

        if tool_name:
            links.append({
                "title": f"🛠️ {tool_name} Tutorial",
                "url": f"{base_url}{tool_name.replace(' ', '+')}+tutorial+beginner",
                "description": f"Learn {tool_name} techniques - these really help! 💪"
            })
    
    # Yoga link with personal message
    links.append({
        "title": f"🧘‍♀️ Gentle Yoga for {symptom}",
        "url": f"{base_url}gentle+yoga+for+{symptom.replace(' ', '+')}+beginners",
        "description": "Try this gentle yoga practice - move at your own pace 🌸"
    })
    
    return links

# Symptom matching
def get_symptom_info(symptom: str):
    """Match user input to database entries"""
    try:
        if not data:
            return None, 0

        all_symptoms = [item["symptom_or_disease"] for item in data]
        match, score = process.extractOne(symptom, all_symptoms)
        
        print(f"🔍 Match: '{match}' with score: {score}")
        
        if score > 60:
            for item in data:
                if item["symptom_or_disease"] == match:
                    return item, score
        return None, 0
    except Exception as e:
        print(f"❌ Error in get_symptom_info: {e}")
        return None, 0

# Medical disclaimer constant
MEDICAL_DISCLAIMER = """

⚠️ **Important Note:** This information is for educational purposes only and is not a replacement for professional medical diagnosis or treatment. Please consult with a qualified healthcare provider for proper medical advice."""

# Generate empathetic response with Groq
def generate_conversational_response(
    user_message: str, 
    matched_data=None, 
    conversation_context: str = "",
    is_first_message: bool = True
) -> str:
    """Create a contextual, conversational response using Groq"""
    
    system_prompt = """You are EMO-Calm, a warm, empathetic health companion who remembers conversation context.

Your personality:
- Warm, caring, and supportive like talking to a trusted friend
- Remember what the user told you earlier in the conversation
- Build on previous topics naturally
- Acknowledge their journey and progress
- Use conversational language, not clinical
- Show empathy and understanding
- Use emojis naturally but not excessively

IMPORTANT: 
- Always remind users this is educational information, not medical diagnosis
- Encourage consulting healthcare professionals for serious concerns
- If you don't have specific information, be honest about limitations

Guidelines:
- If user mentioned symptoms before, acknowledge them
- If they're asking follow-up questions, reference earlier discussion
- Keep responses conversational (150-250 words)
- Always maintain a supportive, hopeful tone
- End with medical disclaimer when providing health information"""

    if matched_data:
        context_intro = ""
        if not is_first_message and conversation_context:
            context_intro = f"\n\nConversation so far:\n{conversation_context}\n\n"
        
        user_prompt = f"""{context_intro}User's current message: "{user_message}"

I found information about: {matched_data['symptom_or_disease']}

Create a warm, conversational response that:
1. Acknowledges what they shared (and references earlier conversation if relevant)
2. Shows empathy and understanding
3. Naturally explains the physical and emotional connections
4. Offers practical healing guidance
5. Mentions you're sharing helpful meditation and breathwork videos below
6. Encourages them in their healing journey
7. MUST remind them this is educational, not medical diagnosis

Available information:
- Physical Cause: {matched_data['physical_root_cause']}
- Emotional Cause: {matched_data['emotional_root_cause']}
- Healing Tips: {matched_data['healing_tips']}
- Healing Tools: {matched_data['healing_tools']}

End your response mentioning: "I've also found some great meditation and breathwork videos for you below - give them a try! 🎥✨"

Keep it conversational and supportive, like talking to a friend who cares."""
    else:
        context_intro = ""
        if not is_first_message and conversation_context:
            context_intro = f"\n\nConversation so far:\n{conversation_context}\n\n"
        
        user_prompt = f"""{context_intro}User's current message: "{user_message}"

The user is sharing something I don't have specific health data for. Provide a warm, supportive response that:
- Honestly states you don't have specific information about this
- Shows empathy and validates their concern
- Suggests they describe symptoms differently or more specifically
- Encourages consulting healthcare professionals
- Offers to help with other health topics you do know about
- Keeps the conversation supportive and caring"""
    
    try:
        if groq_client:
            # Use Groq API with Llama model
            chat_completion = groq_client.chat.completions.create(
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                model="llama-3.3-70b-versatile",  # Free, fast, and high quality
                temperature=0.8,
                max_tokens=450,
            )
            
            return chat_completion.choices[0].message.content
        else:
            return generate_fallback_response(user_message, matched_data, is_first_message)
    except Exception as e:
        print(f"❌ Groq Error: {e}")
        return generate_fallback_response(user_message, matched_data, is_first_message)

def generate_fallback_response(user_message: str, matched_data, is_first_message: bool) -> str:
    """Fallback response without AI"""
    
    if matched_data:
        greeting = "Hello! 💙" if is_first_message else "I understand, "
        return f"""{greeting} I can see you're experiencing {matched_data['symptom_or_disease']}. Let me help you understand what's happening.

**🔬 What's happening in your body:**
{matched_data['physical_root_cause']}

**💭 The emotional-physical connection:**
{matched_data['emotional_root_cause']}

**🌱 Steps toward healing:**
{matched_data['healing_tips']}

**🛠️ Helpful practices and tools:**
{matched_data['healing_tools']}

You're taking an important step by seeking understanding. Healing takes time, and I'm here to support you throughout this journey. 💚

**I've found some helpful videos for you! 🎥** Check out the meditation and breathwork resources below - they can really make a difference in your healing journey.{MEDICAL_DISCLAIMER}"""
    else:
        return f"""I appreciate you sharing that with me. 💙

**I'm sorry, but I don't have specific information about "{user_message}" in my current knowledge base.** 😔

However, I'm here to help! Could you try:
• Describing your symptoms in a different way?
• Telling me about specific physical sensations you're experiencing?
• Mentioning if this relates to any particular body system or area?

I have knowledge about many common health conditions and their emotional-physical connections. I'd love to help if you can share more details!

**Remember:** If you're experiencing concerning symptoms, it's always best to consult with a qualified healthcare provider who can give you a proper diagnosis and treatment plan.{MEDICAL_DISCLAIMER}"""

# Root endpoint
@app.get("/")
def root():
    return {
        "message": "🌟 EMO-Calm Conversational Chatbot is running!",
        "status": "healthy",
        "version": "2.0.0",
        "features": ["Conversation History", "Context-Aware Responses", "Session Management", "Groq Llama AI"],
        "endpoints": {
            "chat": "POST /chat",
            "history": "GET /conversation/{session_id}",
            "clear": "DELETE /conversation/{session_id}",
            "health": "GET /health"
        }
    }

# Health check
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "data_entries": len(data),
        "groq_configured": bool(groq_client),
        "active_sessions": len(conversations)
    }

# Main chat endpoint with conversation
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Conversational chat endpoint - maintains context across messages
    """
    try:
        user_message = request.message.strip()
        
        # Get or create session
        session_id = get_or_create_session(request.session_id)
        
        # Store user name if provided
        if request.user_name and session_id in conversations:
            conversations[session_id]["user_name"] = request.user_name
        
        print(f"\n📥 [Session: {session_id[:8]}...] Received: '{user_message}'")
        
        # Get conversation context
        is_first_message = len(conversations[session_id]["messages"]) == 0
        conversation_context = get_conversation_context(session_id)
        
        # Add user message to history
        add_message(session_id, "user", user_message)
        
        # Try to match symptom
        matched_data, match_score = get_symptom_info(user_message)
        
        if matched_data:
            print(f"✅ Found match: {matched_data['symptom_or_disease']} (score: {match_score})")
        else:
            print(f"ℹ️ No symptom match, providing 'no knowledge' response")
        
        # Generate contextual response
        ai_response = generate_conversational_response(
            user_message, 
            matched_data, 
            conversation_context,
            is_first_message
        )
        
        # Add assistant response to history
        add_message(session_id, "assistant", ai_response)
        
        # Get conversation summary
        conv_summary = get_conversation_summary(session_id)
        
        # Prepare response
        response_data = {
            "reply": ai_response,
            "session_id": session_id,
            "matched_symptom": matched_data['symptom_or_disease'] if matched_data else None,
            "physical_cause": matched_data['physical_root_cause'] if matched_data else None,
            "emotional_cause": matched_data['emotional_root_cause'] if matched_data else None,
            "healing_tips": matched_data['healing_tips'] if matched_data else None,
            "healing_tools": matched_data['healing_tools'] if matched_data else None,
            "youtube_links": get_youtube_links(
                matched_data['symptom_or_disease'],
                matched_data['healing_tools']
            ) if matched_data else None,
            "conversation_context": conv_summary
        }
        
        print(f"✅ Response sent. Session has {len(conversations[session_id]['messages'])} messages")
        
        return ChatResponse(**response_data)
    
    except Exception as e:
        print(f"❌ Error in chat endpoint: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Get conversation history
@app.get("/conversation/{session_id}")
def get_conversation_history(session_id: str):
    """Get full conversation history for a session"""
    if session_id not in conversations:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return {
        "session_id": session_id,
        "messages": conversations[session_id]["messages"],
        "created_at": conversations[session_id]["created_at"],
        "last_updated": conversations[session_id]["last_updated"],
        "message_count": len(conversations[session_id]["messages"])
    }

# Clear conversation
@app.delete("/conversation/{session_id}")
def clear_conversation(session_id: str):
    """Clear a conversation session"""
    if session_id in conversations:
        del conversations[session_id]
        return {"message": "Conversation cleared", "session_id": session_id}
    raise HTTPException(status_code=404, detail="Session not found")

# Get all active sessions
@app.get("/sessions")
def get_active_sessions():
    """Get all active conversation sessions"""
    sessions = []
    for session_id, conv in conversations.items():
        sessions.append({
            "session_id": session_id,
            "message_count": len(conv["messages"]),
            "created_at": conv["created_at"],
            "last_updated": conv["last_updated"]
        })
    return {"sessions": sessions, "total": len(sessions)}

# Get symptoms
@app.get("/symptoms")
def get_all_symptoms():
    """Return all available symptoms"""
    try:
        symptoms = sorted([item["symptom_or_disease"] for item in data])
        return {"symptoms": symptoms, "count": len(symptoms)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("\n🚀 Starting EMO-Calm Conversational Chatbot with Groq Llama AI...")
    print("📍 Server: http://127.0.0.1:8000")
    print("📖 API Docs: http://127.0.0.1:8000/docs")
    print("💬 Features: Conversation memory, context-aware responses, Groq Llama AI")
    print("\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)