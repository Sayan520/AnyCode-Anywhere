# 🔁 AI Code Converter – Backend (Flask + Gemini AI)

This is the backend for the **AI Code Converter** project. It allows you to convert code from one programming language to another using **Google Gemini AI**.

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
git clone https://github.com/your-username/your-repo.git
cd your-repo/backend
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
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ Make sure `.env` is listed in `.gitignore` so it's not tracked in version control.

---

## ▶️ Run the Application

```bash
python app.py
```

Server will be available at: [http://localhost:5000](http://localhost:5000)

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
  "filename": "converted"
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
  "name": "Sayan",
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
backend/
├── app.py                # Main Flask app
├── db.py                 # DB initialization
├── .env                  # API key storage
├── requirements.txt      # Project dependencies
├── static/files/         # Saved converted files
└── templates/index.html  # Optional homepage
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
