
# MongoDB CRUD API

This API provides endpoints for performing CRUD (Create, Read, Update, Delete) operations on a MongoDB database.


## Installation

    1. Clone this repository:

```bash
git clone https://github.com/your-username/mongodb-crud-api.git
```
    2. Install dependencies:
```bash
npm Install
```

    3. Set up your MongoDB connection by creating a .env file in the root directory and adding your MongoDB connection string:
```bash
MONGODB_URI=your_mongodb_connection_string
```


    
## Usage

    1. Start the server:
```bash
npm start
```

    2. Access the API endpoints using Postman or another HTTP client:
        - GET /api/users: Retrieve all Users
        - GET /api/users/:id: Retrieve a User by ID
        - POST /api/users: Create a new User
        - PUT /api/users/:id: Update a User by ID
        - DELETE /api/users/:id: Delete a User by ID


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI: MongoDB connection string`


