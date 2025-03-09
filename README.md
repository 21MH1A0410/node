# API Documentation

## Endpoints

### GET /api/items
- **Description**: Retrieve a list of items.
- **Response**: 
    - `200 OK`: Returns an array of items.
    - `500 Internal Server Error`: If there is an issue with the server.

### POST /api/items
- **Description**: Create a new item.
- **Request Body**:
    ```json
    {
        "name": "string",
        "description": "string"
    }
    ```
- **Response**:
    - `201 Created`: Returns the created item.
    - `400 Bad Request`: If the request body is invalid.

### GET /api/items/{id}
- **Description**: Retrieve a specific item by ID.
- **Response**:
    - `200 OK`: Returns the item.
    - `404 Not Found`: If the item does not exist.

### PUT /api/items/{id}
- **Description**: Update an existing item by ID.
- **Request Body**:
    ```json
    {
        "name": "string",
        "description": "string"
    }
    ```
- **Response**:
    - `200 OK`: Returns the updated item.
    - `400 Bad Request`: If the request body is invalid.
    - `404 Not Found`: If the item does not exist.

### DELETE /api/items/{id}
- **Description**: Delete an item by ID.
- **Response**:
    - `204 No Content`: If the deletion is successful.
    - `404 Not Found`: If the item does not exist.

## How to Use

1. **Retrieve Items**: Send a GET request to `/api/items` to get a list of items.
2. **Create Item**: Send a POST request to `/api/items` with a JSON body containing `name` and `description`.
3. **Retrieve Item by ID**: Send a GET request to `/api/items/{id}` with the item ID.
4. **Update Item**: Send a PUT request to `/api/items/{id}` with a JSON body containing `name` and `description`.
5. **Delete Item**: Send a DELETE request to `/api/items/{id}` with the item ID.