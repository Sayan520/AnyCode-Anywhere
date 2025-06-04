from flask import Flask, render_template
from flask_cors import CORS
from database.db import init_db
from config import configure_genai
from routes.convert import convert_route
from routes.contact import contact_route

app = Flask(__name__)
CORS(app)
init_db()
configure_genai()

# Default route
@app.route("/")
def home():
    return render_template("index.html")

# Register routes directly
app.add_url_rule("/api/convert", view_func=convert_route, methods=["POST"])
app.add_url_rule("/api/contact", view_func=contact_route, methods=["POST"])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
