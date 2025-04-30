import pyodbc

def get_connection():
    try:
        sql_server_config = {
            "driver": "{ODBC Driver 17 for SQL Server}",
            "server": "122.163.121.176,3050",
            "database": "ContactApp",
            "user": "Developer1",
            "password": "Aiinhome@123"
        }
        conn = pyodbc.connect(**sql_server_config)
        return conn
    except Exception as e:
        print("Connection failed:", str(e))
        return None

def init_db():
    conn = get_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("""
                IF NOT EXISTS (
                    SELECT * FROM INFORMATION_SCHEMA.TABLES 
                    WHERE TABLE_NAME = 'ContactMessages'
                )
                CREATE TABLE ContactMessages (
                    Id INT PRIMARY KEY IDENTITY(1,1),
                    Name NVARCHAR(100) NOT NULL,
                    Email NVARCHAR(100) NOT NULL,
                    Message NVARCHAR(MAX) NOT NULL
                )
            """)
            conn.commit()
            print("Table ready.")
        except Exception as e:
            print("Table creation error:", str(e))
        finally:
            conn.close()
