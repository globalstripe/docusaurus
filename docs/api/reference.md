# API Reference

This page provides a comprehensive reference for all Clearshore API endpoints, including request/response schemas, authentication, and error handling.

## OpenAPI Specification

Our API is fully documented using the OpenAPI 3.0 specification. You can:

- **Download the OpenAPI spec**: [openapi.yaml](/api-openapi.yaml)
- **Import into Postman**: Use the OpenAPI URL in Postman
- **Generate SDKs**: Use tools like OpenAPI Generator to create client libraries

## Base URL

All API requests should be made to:
```
https://api.clearshore.com/v1
```

## Authentication

Most endpoints require authentication using API keys. Include your API key in the request header:

```http
Authorization: Bearer YOUR_API_KEY
```

### Getting an API Key

1. Sign up for a Clearshore account
2. Navigate to Settings > API Keys
3. Generate a new API key
4. Store it securely (it won't be shown again)

## Rate Limiting

API requests are rate limited based on the endpoint type:

| Endpoint Type | Rate Limit |
|---------------|------------|
| Health Check | No limit |
| User Management | 100 requests/hour |
| Data Processing | 10 uploads/hour, 5 concurrent jobs |
| Webhooks | 100 requests/hour |

Rate limit information is included in response headers:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Error Handling

All errors follow a consistent format:

```json
{
  "error": "error_code",
  "message": "Human-readable error message",
  "details": {
    "field": "additional_error_details"
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `validation_error` | Request validation failed |
| `unauthorized` | Invalid or missing API key |
| `forbidden` | Insufficient permissions |
| `not_found` | Resource not found |
| `rate_limit_exceeded` | Rate limit exceeded |
| `internal_error` | Server error |

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 202 | Accepted (async operations) |
| 204 | No Content (successful deletion) |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 413 | Payload Too Large |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

## Pagination

List endpoints support pagination using query parameters:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number (1-based) |
| `limit` | integer | 20 | Items per page (max 100) |

Paginated responses include pagination metadata:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

## Filtering and Sorting

Many list endpoints support filtering and sorting:

### Filtering

Use query parameters to filter results:

```http
GET /users?role=admin&status=active
```

### Sorting

Use the `sort` parameter with field names:

```http
GET /users?sort=created_at:desc,name:asc
```

## Webhooks

Webhooks allow you to receive real-time notifications when events occur. See the [Webhooks documentation](/docs/api/webhooks) for details.

### Event Types

- `user.created` - New user created
- `user.updated` - User information updated
- `user.deleted` - User deleted
- `data.uploaded` - Data file uploaded
- `data.processed` - Data processing completed
- `data.failed` - Data processing failed

## SDKs and Libraries

We provide official SDKs for popular languages:

### JavaScript/Node.js

```bash
npm install @clearshore/api-client
```

```javascript
import { ClearshoreAPI } from '@clearshore/api-client';

const api = new ClearshoreAPI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.clearshore.com/v1'
});

// Create a user
const user = await api.users.create({
  email: 'user@example.com',
  name: 'John Doe'
});
```

### Python

```bash
pip install clearshore-api
```

```python
from clearshore import ClearshoreAPI

api = ClearshoreAPI(
    api_key='your-api-key',
    base_url='https://api.clearshore.com/v1'
)

# Create a user
user = api.users.create(
    email='user@example.com',
    name='John Doe'
)
```

### Go

```bash
go get github.com/clearshore/go-sdk
```

```go
package main

import (
    "github.com/clearshore/go-sdk"
)

func main() {
    client := clearshore.NewClient("your-api-key")
    
    user, err := client.Users.Create(&clearshore.CreateUserRequest{
        Email: "user@example.com",
        Name:  "John Doe",
    })
}
```

## Testing

### Postman Collection

Import our Postman collection to test the API:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/your-collection-id)

### cURL Examples

```bash
# Health check
curl https://api.clearshore.com/v1/health

# Create user
curl -X POST https://api.clearshore.com/v1/users \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"John Doe"}'

# Upload data
curl -X POST https://api.clearshore.com/v1/data/upload \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@data.csv" \
  -F "type=csv"
```

## Support

- **Documentation**: [docs.clearshore.com](https://docs.clearshore.com)
- **API Status**: [status.clearshore.com](https://status.clearshore.com)
- **Support Email**: support@clearshore.com
- **GitHub Issues**: [github.com/clearshore/api-issues](https://github.com/clearshore/api-issues)
