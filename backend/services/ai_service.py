import google.generativeai as genai
import os
import re

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is not set!")

genai.configure(api_key=api_key)

# Function to convert code using Gemini API
def convert_code(input_language, output_language, code):
    try:
        prompt = f"""Convert the following {input_language} code to {output_language} without any explanations or comments. Return only the converted code:{code}"""
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)

        if hasattr(response, "text"):
            clean_code = response.text.strip()

            # Remove markdown-style ``` code fences
            if clean_code.startswith("```") and clean_code.endswith("```"):
                lines = clean_code.splitlines()
                clean_code = "\n".join(lines[1:-1]).strip()
            return clean_code

        return "Conversion failed! Please try again."
    
    except Exception as e:
        print("Gemini API error:", e)
        return "Error: Unable to convert!"
