from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Dict, Optional
from datetime import datetime
import csv
import os

app = FastAPI(title="Emotional Suppression Assessment API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class Answer(BaseModel):
    option: int
    score: int

class AssessmentSubmission(BaseModel):
    answers: Dict[str, Answer]
    timestamp: Optional[str] = None

# Storage file
STORAGE_FILE = "assessment_results.csv"

# Helper functions
def initialize_csv():
    """Create CSV file with headers if it doesn't exist"""
    if not os.path.exists(STORAGE_FILE):
        with open(STORAGE_FILE, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            headers = ['ID', 'Timestamp', 'Total_Score', 'Max_Score', 'Percentage', 'Severity', 'Interpretation']
            for i in range(1, 31):
                headers.extend([f'Q{i}_Option', f'Q{i}_Score'])
            writer.writerow(headers)
        print(f"Created CSV file: {os.path.abspath(STORAGE_FILE)}")

def save_to_csv(result):
    """Append result to CSV file"""
    initialize_csv()
    
    with open(STORAGE_FILE, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        
        row = [
            result['id'],
            result['timestamp'],
            result['total_score'],
            result['max_score'],
            result['percentage'],
            result['severity'],
            result['interpretation']
        ]
        
        # Add all 30 question answers
        for i in range(1, 31):
            q_key = str(i)
            if q_key in result['answers']:
                row.append(result['answers'][q_key]['option'])
                row.append(result['answers'][q_key]['score'])
            else:
                row.append('')
                row.append('')
        
        writer.writerow(row)

def read_all_results():
    """Read all results from CSV"""
    if not os.path.exists(STORAGE_FILE):
        return []
    
    results = []
    with open(STORAGE_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            results.append(row)
    return results

def calculate_results(answers: Dict[str, Answer]):
    """Calculate assessment results"""
    total_score = sum(answer.score for answer in answers.values())
    max_score = 100
    percentage = (total_score / max_score) * 100
    
    if percentage <= 25:
        severity = "Minimal"
        interpretation = "You show minimal signs of emotional suppression. You generally express your emotions in healthy ways and have good emotional awareness."
    elif percentage <= 50:
        severity = "Mild"
        interpretation = "You experience mild emotional suppression. While you can express emotions sometimes, there are areas where you hold back or avoid processing feelings."
    elif percentage <= 75:
        severity = "Moderate"
        interpretation = "You show moderate levels of emotional suppression. You frequently hold back emotions, which may be affecting your physical and mental wellbeing."
    else:
        severity = "Severe"
        interpretation = "You experience significant emotional suppression. This pattern is likely impacting your health, relationships, and overall quality of life."
    
    return {
        "total_score": total_score,
        "max_score": max_score,
        "percentage": round(percentage, 2),
        "severity": severity,
        "interpretation": interpretation
    }

# API endpoints
@app.get("/")
def root():
    """Root endpoint"""
    csv_exists = os.path.exists(STORAGE_FILE)
    return {
        "message": "Emotional Suppression Assessment API",
        "version": "1.0.0",
        "storage": "CSV",
        "csv_file_exists": csv_exists,
        "csv_location": os.path.abspath(STORAGE_FILE) if csv_exists else "Not created yet",
        "endpoints": {
            "POST /submit": "Submit assessment answers",
            "GET /results": "Get all results",
            "GET /download-csv": "Download CSV file"
        }
    }

@app.post("/submit")
def submit_assessment(submission: AssessmentSubmission):
    """Submit assessment and get results"""
    try:
        print(f"\n{'='*60}")
        print(f"Received submission with {len(submission.answers)} answers")
        
        # Calculate results
        results = calculate_results(submission.answers)
        
        print(f"Calculated: {results['severity']} - Score: {results['total_score']}/{results['max_score']}")
        
        # Generate unique ID
        timestamp = submission.timestamp or datetime.now().isoformat()
        result_id = f"assessment_{timestamp.replace(':', '-').replace('.', '-')}"
        
        # Create result object
        result = {
            "id": result_id,
            "timestamp": timestamp,
            "answers": {k: v.model_dump() for k, v in submission.answers.items()},
            **results
        }
        
        # Save to CSV
        save_to_csv(result)
        
        csv_path = os.path.abspath(STORAGE_FILE)
        print(f"SAVED TO CSV!")
        print(f"File location: {csv_path}")
        print(f"{'='*60}\n")
        
        return result
        
    except Exception as e:
        print(f"\nERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/results")
def get_all_results():
    """Get all assessment results from CSV"""
    try:
        results = read_all_results()
        return {
            "count": len(results),
            "results": results,
            "storage": "CSV",
            "file": STORAGE_FILE
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download-csv")
def download_csv():
    """Download the CSV file"""
    if not os.path.exists(STORAGE_FILE):
        raise HTTPException(status_code=404, detail="No data available yet")
    
    return FileResponse(
        path=STORAGE_FILE,
        filename="emotional_assessment_results.csv",
        media_type="text/csv"
    )

if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*60)
    print("Starting Emotional Suppression Assessment API")
    print("="*60)
    print(f"CSV file: {os.path.abspath(STORAGE_FILE)}")
    print(f"API will run at: http://localhost:8000")
    print(f"API docs at: http://localhost:8000/docs")
    print(f"Download CSV at: http://localhost:8000/download-csv")
    print("="*60 + "\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)