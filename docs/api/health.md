# Health Check

The health check endpoint allows you to verify that the Clearshore API is operational and check the status of various services.

## Endpoint

```http
GET /health
```

## Description

This endpoint provides information about the current status of the API and its dependencies. It's useful for monitoring, debugging, and ensuring the service is available.

## Request

### Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `Accept` | string | No | Content type (default: `application/json`) |

### Example Request

```bash
curl -X GET "https://api.clearshore.com/v1/health" \
  -H "Accept: application/json"
```

## Response

### Success Response (200 OK)

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.2.3",
  "services": {
    "database": "healthy",
    "cache": "healthy",
    "queue": "healthy"
  },
  "uptime": 86400
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Overall health status (`healthy`, `degraded`, `unhealthy`) |
| `timestamp` | string | ISO 8601 timestamp of the health check |
| `version` | string | Current API version |
| `services` | object | Status of individual services |
| `uptime` | number | Service uptime in seconds |

### Error Response (503 Service Unavailable)

```json
{
  "status": "unhealthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.2.3",
  "services": {
    "database": "unhealthy",
    "cache": "healthy",
    "queue": "degraded"
  },
  "errors": [
    {
      "service": "database",
      "message": "Connection timeout"
    }
  ]
}
```

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Service is healthy |
| 503 | Service is unhealthy or degraded |

## Rate Limiting

This endpoint is not rate limited and can be called frequently for monitoring purposes.

## Examples

### JavaScript

```javascript
const response = await fetch('https://api.clearshore.com/v1/health');
const health = await response.json();

if (health.status === 'healthy') {
  console.log('API is operational');
} else {
  console.log('API has issues:', health.errors);
}
```

### Python

```python
import requests

response = requests.get('https://api.clearshore.com/v1/health')
health = response.json()

if health['status'] == 'healthy':
    print('API is operational')
else:
    print('API has issues:', health.get('errors', []))
```

### cURL

```bash
# Basic health check
curl https://api.clearshore.com/v1/health

# With verbose output
curl -v https://api.clearshore.com/v1/health
```
