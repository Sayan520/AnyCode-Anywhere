import re

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
