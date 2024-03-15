# Express.js Backend API

This Express.js backend API provides endpoints for performing CRUD (Create, Read, Update, Delete) operations on MongoDB.

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/DimitarAtanassov/mongodb-crud-api.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your MongoDB connection by creating a `.env` file in the root directory and adding your MongoDB connection string:

    ```env
    MONGODB_URL=your_mongodb_connection_string
    ```

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. Access the API endpoints using Postman or another HTTP client:

    - `GET /api/users`: Retrieve all Users
    - `GET /api/users/:id`: Retrieve a User by ID
    - `POST /api/users`: Create a new User
    - `PUT /api/users/:id`: Update a User by ID
    - `DELETE /api/users/:id`: Delete a User by ID

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `MONGODB_URL`: MongoDB connection string

## Endpoints

### User Routes

- `POST /api/users`: Create a new user
- `POST /api/users/login`: User login
- `PUT /api/users/:userID`: Update user password (Protected)
- `DELETE /api/users/:userID`: Delete a user (Protected)
- `GET /api/users/:userID`: Get user by ID (Protected)

### Job Application Routes

- `POST /api/users/jobapps`: Create a job application (Protected)
- `GET /api/jobapps`: Get all job applications by user ID (Protected)
- `PUT /api/jobapps/:id/status`: Update job application status (Protected)

## Middleware

### Authentication Middleware

- `verifyToken`: Verifies JWT included in the request header

## Models

### User Model

- `username`: String (required, unique)
- `email`: String (required, unique)
- `password`: String (required)
- `jobApplications`: Array of ObjectIDs referencing JobApplication documents

### Job Application Model

- `company`: String (required)
- `title`: String (required)
- `link`: String (required)
- `user`: ObjectID referencing a User document (required)
- `status`: String (default: 'pending', enum: ['pending', 'accepted', 'rejected'])

## Controllers

- `user.js`: CRUD functions for User documents in MongoDB
- `jobApp.js`: CRUD functions for Job Application documents in MongoDB

## Utilities

- `auth.js`: User authentication middleware using JSON Web Token (JWT)
- `validators.js`: Utility functions for input validation
