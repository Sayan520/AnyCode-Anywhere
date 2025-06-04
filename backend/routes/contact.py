from flask import request, jsonify
from database.db import get_connection

# Route to handle contact form submissions
def contact_route():
    try:
        data = request.json or {}
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
        print("Contact error:", e)
        return jsonify({"error": "Internal Server Error"}), 500
