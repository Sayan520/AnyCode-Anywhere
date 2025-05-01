
# 🚀 Deployment Guide: Angular + Flask (Render, Single GitHub Repo)

## 📁 Project Structure

```
/anycode-anywhere
├── /frontend    # Angular App
└── /backend     # Flask Backend
```

---

## 🐍 Deploy Flask Backend (Web Service on Render)

### ✅ Step 1: Prepare Environment

```bash
# Create virtual environment
python -m venv venv
# Activate (Windows)
.\venv\Scripts\activate
# Install dependencies and freeze
pip install -r requirements.txt
pip freeze > requirements.txt
```

### ✅ Step 2: Deploy on Render

1. Go to **Render → New → Web Service**
2. Connect your **GitHub repository**
3. Fill out these:

| Setting               | Value                                   |
|------------------------|------------------------------------------|
| **Name**              | anycode-anywhere-backend                |
| **Language**          | Python 3                                |
| **Branch**            | `main`                                  |
| **Root Directory**    | `backend`                               |
| **Build Command**     | `pip install -r requirements.txt`       |
| **Start Command**     | `gunicorn app:app` *(if app.py is main)*|
| **Instance Type**     | Free (for hobby use)                    |

4. **Environment Variables**  
   Add if needed (e.g., API keys):

```
NAME: GEMINI_API_KEY
VALUE: your-key-here
```

> ⚠️ If using a database, it must be **cloud-hosted** (Azure, AWS, etc.), not local SSMS.

---

## 🌐 Deploy Angular Frontend (Static Site on Render)

### ✅ Step 1: Set Production API Endpoint

`frontend/src/environments/environment.prod.ts`
```ts
export const environment = {
  production: true,
  baseUrl: 'https://anycode-anywhere-backend.onrender.com'
};
```

---

### ✅ Step 2: Add `static.json`

Create `frontend/static.json`
```json
{
  "routes": [
    {
      "source": "**",
      "destination": "/index.html"
    }
  ]
}
```

---

### ✅ Step 3: Update `angular.json` and `package.json`

`angular.json` (ensure this is in the `"production"` section):
```json
"fileReplacements": [
  {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.prod.ts"
  }
],
"outputHashing": "all"
```

`package.json`:
```json
"scripts": {
  "build": "ng build --configuration production"
}
```

---

### ✅ Step 4: Build Angular App

```bash
ng build --configuration production
```

---

### ✅ Step 5: Push All Changes

```bash
git add .
git commit -m "Fix: ensure correct build and static config"
git push
```

---

### ✅ Step 6: Deploy on Render

1. Go to **Render → New → Static Site**
2. Connect your GitHub repository
3. Fill out these:

| Setting               | Value                                                  |
|------------------------|--------------------------------------------------------|
| **Name**              | anycode-anywhere-frontend                             |
| **Root Directory**    | `frontend`                                            |
| **Build Command**     | `npm install && npm run build --configuration=production` |
| **Publish Directory** | `dist/code-converter/browser`                         |

---

## 📌 Extras

- `.vscode/` should **not** be pushed → add this to `.gitignore`:
```bash
# .gitignore
.vscode/
dist/
venv/
```
