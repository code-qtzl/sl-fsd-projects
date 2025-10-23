# Secure Authentication System - Frontend

React-based frontend client for the secure authentication system with user registration, login, and role-based access control.

## Prerequisites

-   Node.js (version 16.0 or higher)
-   npm or yarn package manager
-   Backend server running on `http://localhost:5000`

## Setup and Installation

1. **Navigate to the client directory:**

    ```bash
    cd client
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm run dev
    ```

4. **Open your browser and navigate to:**
    ```
    http://localhost:5173
    ```

## Available Scripts

-   `npm run dev` - Start the development server with hot reload
-   `npm run build` - Build the application for production
-   `npm run preview` - Preview the production build locally
-   `npm run lint` - Run ESLint for code quality checks

## Features

-   User registration with email, password, and role selection
-   User login with credential validation
-   Role-based welcome screens (Admin/Customer)
-   Real-time form validation and error handling
-   Responsive design with Tailwind CSS
-   Clean and intuitive user interface

## API Configuration

The frontend is configured to communicate with the backend server at `http://localhost:5000/api`. If your backend runs on a different port, update the `API_BASE_URL` in `src/services/authService.js`.

## Technologies Used

-   React 19.1.1
-   Vite (build tool)
-   Tailwind CSS (styling)
-   Axios (HTTP client)
-   ESLint (code linting)
