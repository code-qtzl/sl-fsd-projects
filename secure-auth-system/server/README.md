# Secure Authentication System - Backend

Express.js backend server providing secure user authentication APIs with MongoDB database integration and bcrypt password hashing.

## Prerequisites

-   Node.js (version 16.0 or higher)
-   npm or yarn package manager
-   MongoDB database (local installation or MongoDB Atlas)
-   Environment variables configuration

## Setup and Installation

1. **Navigate to the server directory:**

    ```bash
    cd server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create environment variables file:**

    ```bash
    touch .env
    ```

4. **Configure environment variables in `.env` file:**

    ```env
    MONGODB_URI=mongodb+srv://<db_username>:<db_password><db_path>
    PORT=5000
    BCRYPT_SALT_ROUNDS=12
    ```

5. **Start the development server:**

    ```bash
    npm run start
    ```

6. **Server will be running at:**
    ```
    http://localhost:5000
    ```

## Available Scripts

-   `npm start` - Start the production server
-   `npm run start` - Start the development server
-   `npm test` - Run tests (placeholder)

## API Endpoints

### Authentication Routes

-   `POST /api/auth/register` - User registration
-   `POST /api/auth/login` - User login
-   `GET /api/health` - Health check endpoint

## Environment Variables

| Variable             | Description                  | Default  |
| -------------------- | ---------------------------- | -------- |
| `MONGODB_URI`        | MongoDB connection string    | Required |
| `PORT`               | Server port number           | 5000     |
| `BCRYPT_SALT_ROUNDS` | Password hashing salt rounds | 12       |

## Features

-   Secure user registration and authentication
-   Password hashing with bcrypt (configurable salt rounds)
-   Role-based user management (Admin/Customer)
-   Input validation and error handling
-   MongoDB integration with Mongoose ODM
-   CORS enabled for frontend communication
-   Structured error responses

## Database Schema

### User Model

```javascript
{
  email: String (required, unique, validated)
  password: String (required, hashed with bcrypt)
  role: String (required, enum: ['admin', 'customer'])
  createdAt: Date (default: now)
}
```

## Technologies Used

-   Express.js 5.1.0 (web framework)
-   MongoDB 6.20.0 (database)
-   Mongoose 8.0.0 (ODM)
-   bcrypt 6.0.0 (password hashing)
-   CORS 2.8.5 (cross-origin requests)
-   dotenv 17.2.3 (environment variables)

## Security Features

-   Passwords are never stored in plain text
-   Configurable bcrypt salt rounds
-   Input validation on all endpoints
-   Structured error handling
-   No sensitive data in API responses
