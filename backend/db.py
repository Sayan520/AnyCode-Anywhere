import os
import mysql.connector

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

# import pyodbc

# def get_connection():
#     try:
#         sql_server_config = {
#             "driver": "{ODBC Driver 17 for SQL Server}",
#             "server": "122.163.121.176,3050",
#             "database": "ContactApp",
#             "user": "Developer1",
#             "password": "Aiinhome@123"
#         }
#         conn = pyodbc.connect(**sql_server_config)
#         return conn
#     except Exception as e:
#         print("Connection failed:", str(e))
#         return None

# def init_db():
#     conn = get_connection()
#     if conn:
#         try:
#             cursor = conn.cursor()
#             cursor.execute("""
#                 IF NOT EXISTS (
#                     SELECT * FROM INFORMATION_SCHEMA.TABLES 
#                     WHERE TABLE_NAME = 'ContactMessages'
#                 )
#                 CREATE TABLE ContactMessages (
#                     Id INT PRIMARY KEY IDENTITY(1,1),
#                     Name NVARCHAR(100) NOT NULL,
#                     Email NVARCHAR(100) NOT NULL,
#                     Message NVARCHAR(MAX) NOT NULL
#                 )
#             """)
#             conn.commit()
#             print("Table ready.")
#         except Exception as e:
#             print("Table creation error:", str(e))
#         finally:
#             conn.close()
