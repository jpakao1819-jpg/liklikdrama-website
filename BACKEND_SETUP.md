# LiklikDrama Backend Setup Guide

This guide will help you set up the Python Flask backend for the LiklikDrama website.

## Prerequisites

Before you begin, make sure you have:

1. **Python 3.8 or higher** installed
2. **MySQL 8.0 or higher** installed and running
3. **pip** (Python package manager)

## Step-by-Step Setup

### 1. Install MySQL Database

If you don't have MySQL installed:

1. Download MySQL from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
2. Install MySQL following the installation wizard
3. Start MySQL service
4. Set a root password (remember this!)

### 2. Create Database

Open MySQL Command Line Client or MySQL Workbench and run:

```sql
CREATE DATABASE liklikdrama CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Setup Python Backend

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

4. **Install required packages:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure environment variables:**
   ```bash
   copy .env.example .env
   ```
   
   Then edit the `.env` file with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=liklikdrama
   ```

### 4. Start the Backend Server

1. **Make sure your virtual environment is activated**
2. **Run the Flask application:**
   ```bash
   python app.py
   ```

3. **You should see:**
   ```
   Database tables initialized successfully
   * Running on http://0.0.0.0:5000
   ```

### 5. Test the Backend

Open your browser and visit: `http://localhost:5000/api/health`

You should see:
```json
{
  "status": "healthy",
  "timestamp": "2024-09-09T..."
}
```

## Testing Story Submission

1. **Start your frontend server** (if not already running):
   ```bash
   # From the main project directory
   python -m http.server 8000
   ```

2. **Open your website** at `http://localhost:8000`

3. **Navigate to Updates page** and click "Write Your Story"

4. **Fill out the form** and submit

5. **The story will be saved** to your MySQL database

## API Endpoints

### Health Check
- **URL:** `GET http://localhost:5000/api/health`
- **Purpose:** Check if backend is running

### Submit Story
- **URL:** `POST http://localhost:5000/api/stories`
- **Body:**
  ```json
  {
    "title": "My PNG Story",
    "author_name": "John Doe",
    "author_email": "john@example.com",
    "language": "tokpisin",
    "content": "Your story content here..."
  }
  ```

### Get All Stories
- **URL:** `GET http://localhost:5000/api/stories`
- **Purpose:** Retrieve all submitted stories (admin use)

### Get Specific Story
- **URL:** `GET http://localhost:5000/api/stories/{id}`
- **Purpose:** Get details of a specific story

### Update Story Status
- **URL:** `PUT http://localhost:5000/api/stories/{id}/status`
- **Body:**
  ```json
  {
    "status": "approved"
  }
  ```

## Troubleshooting

### Database Connection Failed
- Ensure MySQL is running
- Check your `.env` credentials
- Verify the database name is correct

### Import Errors
- Make sure virtual environment is activated
- Reinstall packages: `pip install -r requirements.txt`

### Port Already in Use
- Change port in `app.py` (line: `app.run(debug=True, host='0.0.0.0', port=5000)`)
- Or stop the process using port 5000

### Backend Not Responding
- Check if Flask server is running
- Look at console for error messages
- Verify MySQL connection

## Running Both Frontend and Backend

You'll need two terminal windows:

**Terminal 1 (Frontend):**
```bash
cd liklikdrama-website
python -m http.server 8000
```

**Terminal 2 (Backend):**
```bash
cd liklikdrama-website/backend
venv\Scripts\activate
python app.py
```

Then access your website at: `http://localhost:8000`

## Features Implemented

✅ Story submission with validation
✅ Word count enforcement (500-2000 words)
✅ Email validation
✅ MySQL database storage
✅ RESTful API endpoints
✅ Automatic table creation
✅ Loading states and error handling
✅ Email fallback if backend is unavailable
✅ CORS enabled for frontend communication

## Next Steps

- Add authentication for admin endpoints
- Implement file upload for story images
- Add admin dashboard interface
- Set up production deployment
- Add rate limiting for submissions
- Implement email notifications