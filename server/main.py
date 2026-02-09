from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from services.gemini_service import analyze_step
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# CORS config allowing frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok", "service": "Hardware Mentor AI"}

@app.post("/analyze")
async def analyze(
    image: UploadFile = File(...),
    audio: UploadFile = File(None),
    step_context: str = Form(...)
):
    try:
        image_bytes = await image.read()
        audio_bytes = await audio.read() if audio else None
        
        # Mock Mode Bypass (Environment Variable)
        if os.getenv("MOCK_MODE") == "True":
             return {
                "status": "success",
                "feedback": "(MOCK) Excellent soldering! The joint is shiny and conical.",
                "audio": None # Frontend handles missing audio gracefully
            }

        result = await analyze_step(image_bytes, audio_bytes, step_context)
        
        return {
            "status": "success",
            "feedback": result.get("text"),
            "audio": result.get("audio")
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)