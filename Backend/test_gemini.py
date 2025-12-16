import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("❌ GEMINI_API_KEY not found in .env file!")
    exit()

print(f"✅ API Key found: {GEMINI_API_KEY[:10]}...{GEMINI_API_KEY[-5:]}")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

print("\n📋 Listing available models...")
try:
    models = genai.list_models()
    print("\n✅ Available models for generateContent:")
    for model in models:
        if 'generateContent' in model.supported_generation_methods:
            print(f"  - {model.name}")
except Exception as e:
    print(f"❌ Error listing models: {e}")

print("\n\n🧪 Testing a simple generation...")

# Try different model names
model_names = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash',
    'gemini-1.5-pro-latest',
    'gemini-1.5-pro',
    'gemini-pro',
    'models/gemini-1.5-flash',
    'models/gemini-pro'
]

for model_name in model_names:
    try:
        print(f"\n🔄 Trying: {model_name}")
        model = genai.GenerativeModel(model_name)
        response = model.generate_content("Say 'Hello, I am working!' in a friendly way.")
        print(f"✅ SUCCESS with {model_name}!")
        print(f"Response: {response.text}")
        print(f"\n🎉 Use this model name in your main.py: {model_name}")
        break
    except Exception as e:
        print(f"❌ Failed: {str(e)[:100]}")

print("\n✅ Test complete!")