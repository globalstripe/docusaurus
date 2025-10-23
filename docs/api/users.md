# User Management API

The User Management API provides endpoints for creating, reading, updating, and deleting user accounts in the Clearshore system.

## Authentication

All endpoints in this section require authentication using an API key:

```http
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Create User

```http
POST /users
```

Creates a new user account.

#### Request Body

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "metadata": {
    "department": "Engineering",
    "location": "San Francisco"
  }
}
```

#### Response (201 Created)

```json
{
  "id": "usr_123456789",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "metadata": {
    "department": "Engineering",
    "location": "San Francisco"
  }
}
```

### Get User

```http
GET /users/{user_id}
```

Retrieves a specific user by ID.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | string | Yes | Unique identifier for the user |

#### Response (200 OK)

```json
{
  "id": "usr_123456789",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z",
  "metadata": {
    "department": "Engineering",
    "location": "San Francisco"
  }
}
```

### List Users

```http
GET /users
```

Retrieves a paginated list of users.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number |
| `limit` | integer | No | 20 | Number of users per page |
| `role` | string | No | - | Filter by user role |
| `status` | string | No | - | Filter by user status |

#### Response (200 OK)

```json
{
  "data": [
    {
      "id": "usr_123456789",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

### Update User

```http
PUT /users/{user_id}
```

Updates an existing user.

#### Request Body

```json
{
  "name": "John Smith",
  "role": "admin",
  "metadata": {
    "department": "Engineering",
    "location": "New York"
  }
}
```

#### Response (200 OK)

```json
{
  "id": "usr_123456789",
  "email": "user@example.com",
  "name": "John Smith",
  "role": "admin",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T11:45:00Z",
  "metadata": {
    "department": "Engineering",
    "location": "New York"
  }
}
```

### Delete User

```http
DELETE /users/{user_id}
```

Deletes a user account.

#### Response (204 No Content)

No response body.

## Error Responses

### 400 Bad Request

```json
{
  "error": "validation_error",
  "message": "Invalid request data",
  "details": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "error": "unauthorized",
  "message": "Invalid or missing API key"
}
```

### 404 Not Found

```json
{
  "error": "not_found",
  "message": "User not found"
}
```

### 429 Too Many Requests

```json
{
  "error": "rate_limit_exceeded",
  "message": "Rate limit exceeded. Try again later.",
  "retry_after": 3600
}
```

## Rate Limiting

- **Create/Update/Delete**: 100 requests per hour
- **Read operations**: 1000 requests per hour

## Examples

### JavaScript

```javascript
// Create a new user
const newUser = await fetch('https://api.clearshore.com/v1/users', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user'
  })
});

const user = await newUser.json();
console.log('Created user:', user);
```

### Python

```python
import requests

# Create a new user
response = requests.post(
    'https://api.clearshore.com/v1/users',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json={
        'email': 'user@example.com',
        'name': 'John Doe',
        'role': 'user'
    }
)

user = response.json()
print('Created user:', user)
```
