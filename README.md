# Coffee Shop API

## Overview
This is a RESTful API for managing coffee shops. It allows users to create, read, update, and delete coffee shops, as well as manage favorites and search for coffee shops. The API is built using Node.js, Express, and MongoDB.

## Features
- Create a new coffee shop
- Get all coffee shops
- Search for coffee shops by name
- Get a coffee shop by ID
- Toggle favorite status of a coffee shop
- Get products by category from a coffee shop

## Technologies Used
- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling tool.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **Swagger**: API documentation tool.
- **Helmet**: Middleware for setting various HTTP headers for security.
- **Express-Rate-Limit**: Middleware for basic rate-limiting.
- **Express-Validator**: Middleware for validation and sanitization.
- **Body-Parser**: Middleware for parsing request bodies.
- **Dotenv**: Module for loading environment variables from a `.env` file.
- **Nodemon**: Tool for automatically restarting the server during development.

## Setup

### Prerequisites
- Node.js
- MongoDB
- Nodemon

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yash1190/coffee-shop-finder-api.git
    cd coffee-shop-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    ALLOWED_ORIGINS=list_of_origins_you_want_to_allow
    ```

### Running the Server
1. Start the server:
    ```bash
    npm start
    ```

2. The API will be available at `http://localhost:5000`.

### Running the Server in Development Mode
1. Start the server with Nodemon:
    ```bash
    npm run dev
    ```

## API Documentation
API documentation is available via Swagger. To view the Swagger documentation, visit `http://localhost:5000/api-docs` after starting the server.

## Testing
Use Postman or any other API testing tool to test the API endpoints. Below are some tests you can perform:

### Coffee Shop Endpoints
1. **Create a new coffee shop**
    - URL: `POST /api/coffeeShops`
    - Body:
        ```json
        {
          "name": "Coffee Heaven",
          "address": "123 Brew Lane",
          "rating": 4.5,
          "products": [
            {
              "name": "Espresso",
              "description": "Strong coffee",
              "price": 2.5,
              "category": "coffee"
            }
          ]
        }
        ```

2. **Get all coffee shops**
    - URL: `GET /api/coffeeShops`

3. **Search for coffee shops**
    - URL: `GET /api/coffeeShops/search?q=heaven`

4. **Get a coffee shop by ID**
    - URL: `GET /api/coffeeShops/{id}`

5. **Toggle favorite status**
    - URL: `PUT /api/coffeeShops/{id}/favorite`
    - Body:
        ```json
        {
          "favorite": true
        }
        ```

6. **Get products by category**
    - URL: `GET /api/coffeeShops/{id}/products/{category}`

## Security Considerations
- Use HTTPS in production to encrypt data in transit.
- Store sensitive information like database credentials and JWT secrets in environment variables.
- Validate and sanitize user inputs to prevent SQL injection and other attacks.
- Implement proper error handling to avoid information leakage.

## .gitignore
Ensure sensitive files like .env, etc., are not committed to version control by adding them to your `.gitignore` file. Here is an example `.gitignore` file:

```gitignore
node_modules/
.env
*.log
coverage/
.DS_Store
```
## Acknowledgements
[Node.js](https://nodejs.org/en)
[Express](https://expressjs.com/)
[MongoDB](https://www.mongodb.com/)
[Swagger](https://swagger.io/)

## Contact
If you have any questions or need further assistance, feel free to contact yashasy10@gmail.com
