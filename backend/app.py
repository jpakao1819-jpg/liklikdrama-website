from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Database configuration
db_config = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'liklikdrama')
}

def get_db_connection():
    """Create database connection"""
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

def init_database():
    """Initialize database tables"""
    connection = get_db_connection()
    if connection is None:
        return False
    
    try:
        cursor = connection.cursor()
        
        # Create stories table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS stories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author_name VARCHAR(255) NOT NULL,
                author_email VARCHAR(255) NOT NULL,
                language VARCHAR(50) NOT NULL,
                content TEXT NOT NULL,
                word_count INT NOT NULL,
                status VARCHAR(50) DEFAULT 'pending',
                submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        connection.commit()
        print("Database tables initialized successfully")
        return True
        
    except Error as e:
        print(f"Error creating tables: {e}")
        return False
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/api/stories', methods=['POST'])
def submit_story():
    """Submit a new story"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'author_name', 'author_email', 'language', 'content']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate word count
        content = data['content'].strip()
        word_count = len(content.split())
        
        if word_count < 500 or word_count > 2000:
            return jsonify({
                'error': 'Story must be between 500 and 2000 words',
                'word_count': word_count
            }), 400
        
        # Validate email format
        import re
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, data['author_email']):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Insert into database
        connection = get_db_connection()
        if connection is None:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor()
        
        insert_query = """
            INSERT INTO stories (title, author_name, author_email, language, content, word_count)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        
        cursor.execute(insert_query, (
            data['title'],
            data['author_name'],
            data['author_email'],
            data['language'],
            content,
            word_count
        ))
        
        connection.commit()
        story_id = cursor.lastrowid
        
        cursor.close()
        connection.close()
        
        return jsonify({
            'success': True,
            'message': 'Story submitted successfully',
            'story_id': story_id,
            'word_count': word_count
        }), 201
        
    except Exception as e:
        print(f"Error submitting story: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/stories', methods=['GET'])
def get_stories():
    """Get all stories (for admin use)"""
    try:
        connection = get_db_connection()
        if connection is None:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT id, title, author_name, author_email, language, word_count, 
                   status, submission_date, created_at
            FROM stories 
            ORDER BY submission_date DESC
        """)
        
        stories = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify({'stories': stories}), 200
        
    except Exception as e:
        print(f"Error fetching stories: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/stories/<int:story_id>', methods=['GET'])
def get_story(story_id):
    """Get a specific story by ID"""
    try:
        connection = get_db_connection()
        if connection is None:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT * FROM stories WHERE id = %s
        """, (story_id,))
        
        story = cursor.fetchone()
        
        cursor.close()
        connection.close()
        
        if story is None:
            return jsonify({'error': 'Story not found'}), 404
        
        return jsonify({'story': story}), 200
        
    except Exception as e:
        print(f"Error fetching story: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/stories/<int:story_id>/status', methods=['PUT'])
def update_story_status(story_id):
    """Update story status (for admin use)"""
    try:
        data = request.get_json()
        new_status = data.get('status')
        
        if new_status not in ['pending', 'approved', 'rejected']:
            return jsonify({'error': 'Invalid status'}), 400
        
        connection = get_db_connection()
        if connection is None:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = connection.cursor()
        
        update_query = """
            UPDATE stories SET status = %s WHERE id = %s
        """
        
        cursor.execute(update_query, (new_status, story_id))
        connection.commit()
        
        cursor.close()
        connection.close()
        
        return jsonify({
            'success': True,
            'message': f'Story status updated to {new_status}'
        }), 200
        
    except Exception as e:
        print(f"Error updating story status: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Initialize database on startup
    init_database()
    
    # Run Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)