from flask import request, jsonify
from validator.input_validator import validate_conversion_input
from services.ai_service import convert_code
import os

# Route for the code conversion
def convert_route():
    try:
        data = request.json or {}

        # Input for JSON data
        code = data.get("code", "").strip()
        input_language = data.get("input_language", "").strip().lower()
        output_language = data.get("output_language", "").strip().lower()
        filename = data.get("filename", "").strip()

        # Validate the input data
        errors = validate_conversion_input(code, input_language, output_language, filename)
        if errors:
            return jsonify({"errors": errors}), 400

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
        return jsonify({"error": "Internal Server Error"
    }), 500
