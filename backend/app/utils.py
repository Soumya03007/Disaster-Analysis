import os
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

# Load models once
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
client = InferenceClient(provider="groq", api_key=HF_TOKEN)

def generate_caption(image):
    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        out = model.generate(**inputs)
    return processor.decode(out[0], skip_special_tokens=True)

def generate_disaster_report(caption):
    prompt = f"""
📋 Disaster Report:
You are a disaster response analyst. Based on the following image description, extract structured disaster information.

Image Caption: "{caption}"

Return the following:

Disaster Type  
Human Presence  
Animal Presence  
Casualties or Injured  
Environmental Conditions (CO2, O2, smoke, water, fire, debris, vegetation)  
Infrastructure Damage  
Visibility  

End with a 3-line summary. Use "No Info" if uncertain.
"""
    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )
        return response.choices[0].message.content.replace("**", "")

    except Exception as e:
        return f"❌ Error: {str(e)}"
