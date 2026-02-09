import google.generativeai as genai
import os
from dotenv import load_dotenv
import base64

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

# Initialize Model
# Using gemini-1.5-flash as fallback (Stable, Text/Vision/Audio-Input)
MODEL_NAME = "models/gemini-1.5-flash" 

model = genai.GenerativeModel(MODEL_NAME)

async def analyze_step(image_bytes, audio_bytes, context_text):
    """
    Sends Image + Audio + Context to Gemini.
    Request: Image/Audio Input.
    Response: Text Only (1.5 Flash does not support native Audio Output).
    """
    if not api_key:
        return {
            "text": "API Key missing. Please set GEMINI_API_KEY in .server/.env",
            "audio": None
        }

    prompt = f"""
    You are an expert hardware mentor. The user is working on this step:
    {context_text}

    Analyze the image provided by the user to see if they completed the step correctly.
    Listen to their audio question/comment (if any).

    Provide helpful, encouraging feedback. 
    If they made a mistake, explain mostly how to fix it.
    If they succeeded, congratulate them and suggest the next step.
    
    IMPORTANT: Respond naturally, concisely (2-3 sentences max).
    """

    content = [
        prompt,
        {"mime_type": "image/jpeg", "data": image_bytes},
    ]

    if audio_bytes:
        content.append({"mime_type": "audio/wav", "data": audio_bytes})

    try:
        # Standard generation (Text only for 1.5 Flash)
        # Note: No 'response_modalities' because 1.5 Flash is text-only output
        response = model.generate_content(content)
        
        # DEBUG LOGGING
        print(f"DEBUG: Gemini 1.5 Response: {response.text}")

        return {
            "text": response.text,
            "audio": None # 1.5 Flash does not support native audio output
        }

    except Exception as e:
        print(f"Gemini Error: {e}")
        return {
            "text": f"Error: {str(e)}",
            "audio": None
        }
