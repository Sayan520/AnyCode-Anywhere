import os
import mysql.connector
from dotenv import load_dotenv

# Load database configuration from .env file
load_dotenv()

# method to get the connection to the mysql-database
def get_connection():
    try:
        conn = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            port=int(os.environ.get("DB_PORT", 3306)),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASS"),
            database=os.environ.get("DB_NAME")
        )
        return conn
    except Exception as e:
        print("Connection failed:", str(e))
        return None

# method to initialize the database and create the table if it doesn't exist
def init_db():
    conn = get_connection()
    if conn is None:
        print("Database connection failed.")
        return

    cursor = None
    try:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS ContactMessages (
                Id INT AUTO_INCREMENT PRIMARY KEY,
                Name VARCHAR(100) NOT NULL,
                Email VARCHAR(100) NOT NULL,
                Message TEXT NOT NULL
            )
        """)
        conn.commit()
        print("Table ready.")
    except Exception as e:
        print("Table creation error:", str(e))
    finally:
        if cursor:
            cursor.close()
        conn.close()

