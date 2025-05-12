from flask import Flask, render_template, request, send_file, jsonify
from db import get_connection, init_db
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv  
import os
import re

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app)
init_db()

# Load environment variables from .env file
load_dotenv()  

# Get the API key from the environment variable
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("API Key not found in .env!")

# Configure the Gemini API with the API key
genai.configure(api_key=api_key)

# Function to validate the conversion input
def validate_conversion_input(code, input_language, output_language, filename):
    errors = []

    if not code or not isinstance(code, str) or len(code.strip()) == 0:
        errors.append("Code is required and must be a non-empty string.")

    if not input_language or not isinstance(input_language, str):
        errors.append("Input language is required and must be a string.")

    if not output_language or not isinstance(output_language, str):
        errors.append("Output language is required and must be a string.")

    if filename and (not isinstance(filename, str) or not re.match(r"^[\w\-\.]+$", filename)):
        errors.append("Filename must be alphanumeric (underscore, dash, dot allowed) if provided.")

    return errors

# Function to convert code using Gemini API
def convert_code(input_language, output_language, code):
    try:
        prompt = f"""Convert the following {input_language} code to {output_language} without any explanations or comments. Return only the converted code:{code}"""
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)

        if hasattr(response, "text"):
            clean_code = response.text.strip()

            # Remove markdown-style ``` code fences ```
            if clean_code.startswith("```") and clean_code.endswith("```"):
                lines = clean_code.splitlines()
                # Remove the first and last line (which are ``` or ```lang)
                clean_code = "\n".join(lines[1:-1]).strip()

            return clean_code     
        
        return "Conversion failed! Please try again."
    
    except Exception as e:
        print("Error in Gemini API:", e)
        return "Error: Unable to convert!"

# Route for default homepage
@app.route("/")
def home():
    return "API is working!"

# Route for the code conversion
@app.route("/api/convert", methods=["POST"])
def convert():
    try:
        data = request.json or {}

        # input for json data
        code = data.get("code", "").strip()
        input_language = data.get("input_language", "").strip().lower()
        output_language = data.get("output_language", "").strip().lower()
        filename = data.get("filename", "").strip()

        # Validate the input data
        validation_errors = validate_conversion_input(code, input_language, output_language, filename)
        if validation_errors:
            return jsonify({"errors": validation_errors}), 400
        
        # Set default filename if not provided
        filename = filename or "converted"

        converted_code = convert_code(input_language, output_language, code)
        # print(converted_code)

        # Save the code in a file for optional download
        file_dir = "static/files"
        os.makedirs(file_dir, exist_ok=True)
        file_path = os.path.join(file_dir, f"{filename}.txt")

        with open(file_path, "w") as file:
            file.write(converted_code)
        
        return jsonify({
            "converted_code": converted_code,
            "download_url": f"/static/files/{filename}.txt"
        }), 200

    except Exception as e:
        print("Error in conversion:", e)
        return jsonify({
            "error": "Internal Server Error"
        }), 500

# Route for the contact page
@app.route("/api/contact", methods=["POST"])
def save_contact():
    try:
        data = request.json
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        message = data.get("message", "").strip()

        if not name or not email or not message:
            return jsonify({"error": "All fields are required!"}), 400

        conn = get_connection()
        if conn is None:
            return jsonify({"error": "Database connection failed"}), 500

        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO ContactMessages (Name, Email, Message) 
            VALUES (%s, %s, %s)
        """, (name, email, message))
        conn.commit()
        conn.close()

        return jsonify({"message": "Message sent successfully!"}), 200

    except Exception as e:
        print("Error saving contact:", e)
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == "__main__":
     app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))


