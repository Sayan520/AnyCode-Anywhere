import pyodbc

def get_connection():
    return pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=MRSAYAN\\SQLEXPRESS;"
        "DATABASE=ContactApp;"
        "Trusted_Connection=yes;"
    )

def init_db():
    conn = get_connection()
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
    conn.close()
