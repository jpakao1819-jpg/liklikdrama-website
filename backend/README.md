# LiklikDrama Backend

Flask backend API for the LiklikDrama website with MySQL database.

## Features

- Story submission system with validation
- Word count enforcement (500-2000 words)
- Email validation
- Story status management (pending, approved, rejected)
- RESTful API endpoints
- CORS enabled for frontend communication

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- MySQL 8.0 or higher
- pip (Python package manager)

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   
   On Windows:
   ```bash
   venv\Scripts\activate
   ```
   
   On Mac/Linux:
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=liklikdrama
   ```

### Database Setup

1. **Create MySQL database:**
   ```sql
   CREATE DATABASE liklikdrama CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **The application will automatically create the required tables on first run.**

### Running the Application

1. **Start the Flask server:**
   ```bash
   python app.py
   ```

2. **The API will be available at:** `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server health status

### Submit Story
- **POST** `/api/stories`
- Request body:
  ```json
  {
    "title": "Story Title",
    "author_name": "Author Name",
    "author_email": "author@example.com",
    "language": "tokpisin",
    "content": "Your story content here..."
  }
  ```

### Get All Stories
- **GET** `/api/stories`
- Returns all stories (for admin use)

### Get Specific Story
- **GET** `/api/stories/{id}`
- Returns details of a specific story

### Update Story Status
- **PUT** `/api/stories/{id}/status`
- Request body:
  ```json
  {
    "status": "approved"
  }
  ```
- Valid statuses: `pending`, `approved`, `rejected`

## Database Schema

### Stories Table
- `id` (INT, Primary Key, Auto Increment)
- `title` (VARCHAR 255)
- `author_name` (VARCHAR 255)
- `author_email` (VARCHAR 255)
- `language` (VARCHAR 50)
- `content` (TEXT)
- `word_count` (INT)
- `status` (VARCHAR 50, default: 'pending')
- `submission_date` (DATETIME)
- `created_at` (TIMESTAMP)

## Validation Rules

- Title: Required, max 255 characters
- Author Name: Required, max 255 characters
- Author Email: Required, valid email format
- Language: Required (tokpisin, english, both)
- Content: Required, 500-2000 words

## Development

The application runs in debug mode by default. For production:

1. Set `FLASK_ENV=production` in `.env`
2. Use a production WSGI server like Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check credentials in `.env` file
- Verify database exists

### Import Errors
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`

### Port Already in Use
- Change port in `app.py` (line: `app.run(debug=True, host='0.0.0.0', port=5000)`)