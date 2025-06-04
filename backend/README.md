# 🔁 AnyCode Anywhere – Backend (Flask + Gemini AI)

This is the backend for the **AnyCode Anywhere** project. It allows you to convert code from one programming language to another using **Google Gemini AI**.

---

## 🚀 Features

- Code conversion using Gemini AI
- RESTful Flask API
- Secure API key handling via `.env`
- Contact form submission support
- Converted code saved for download
- Input validation and error handling
- CORS enabled for frontend communication

---

## 🛠️ Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Sayan520/AnyCode-Anywhere.git
cd .\AnyCode-Anywhere\backend\
```

### 2. Create and Activate Virtual Environment

```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Add Gemini API Key

Create a `.env` file in the root of `backend/` and add your API key:

```
GEMINI_API_KEY=your_gemini_api_key_here          # Google Gemini API Key

DB_HOST=your_mysql_host                          # e.g., localhost or IP
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=your_mysql_db_name

```

> ⚠️ Make sure `.env` is listed in `.gitignore` so it's not tracked in version control.

---

## ▶️ Run the Application

```bash
python app.py
```

> ✅ In development: [http://localhost:5000](http://localhost:5000)

> 🌐 In production: http://your-server-ip or via Docker/nginx

---

## 📡 API Endpoints

### 🔁 `POST /api/convert`

Convert code between programming languages.

**Request JSON:**
```json
{
  "code": "print('Hello')",
  "input_language": "python",
  "output_language": "javascript",
  "filename": "py_to_js_converted"
}
```

**Response:**
```json
{
  "converted_code": "console.log('Hello');",
  "download_url": "/static/files/converted.txt"
}
```

---

### 📩 `POST /api/contact`

Submit a contact message.

**Request JSON:**
```json
{
  "name": "Sayan Ghosh",
  "email": "sayan@example.com",
  "message": "Awesome project!"
}
```

**Response:**
```json
{
  "message": "Message sent successfully!"
}
```

---

## 🗂️ Project Structure

```
📁 backend/
├── 🚀 app.py               - Main Flask application
├── 🔐 .env                 - Environment variables (GEMINI API, DB credentials)
├── 📦 requirements.txt     - Python dependencies
├── 📄 README.md            - Project overview and instructions

📁 static/
└── 📂 files/               - Saved converted files

📁 routes/
├── 📄 convert.py           - /api/convert route logic
└── 📄 contact.py           - /api/contact route logic

📁 services/
└── 📄 ai_service.py        - Gemini API interaction logic

📁 services/validator/
└── 📄 input_validator.py   - Input validation logic

📁 database/
└── 📄 db.py                - MySQL DB connection & initialization

```

---

## 🧾 .gitignore Suggestion

```
venv/
__pycache__/
.env
*.pyc
*.db
static/files/
```

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- [Flask](https://flask.palletsprojects.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [Flask-CORS](https://flask-cors.readthedocs.io/)
