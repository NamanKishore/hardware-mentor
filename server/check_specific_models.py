import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

models_to_check = ["models/gemini-2.0-flash-exp", "models/gemini-1.5-flash", "models/gemini-1.5-pro"]

print("Checking models...")
for m in models_to_check:
    try:
        model = genai.GenerativeModel(m)
        response = model.generate_content("Hello")
        print(f"{m}: AVAILABLE")
    except Exception as e:
        print(f"{m}: FAILED - {e}")
