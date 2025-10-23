# Webhooks

Webhooks allow you to receive real-time notifications when events occur in the Clearshore system. This enables you to build integrations and automate workflows based on data changes.

## Overview

Webhooks are HTTP callbacks that are triggered by events in our system. When an event occurs, we send a POST request to your specified URL with the event data.

## Authentication

Webhook requests include a signature header for verification:

```http
X-Clearshore-Signature: sha256=abc123...
```

## Event Types

| Event | Description | Trigger |
|-------|-------------|---------|
| `user.created` | A new user is created | User registration |
| `user.updated` | User information is updated | Profile changes |
| `user.deleted` | A user is deleted | Account deletion |
| `data.uploaded` | A data file is uploaded | File upload |
| `data.processed` | Data processing is completed | Processing job completion |
| `data.failed` | Data processing failed | Processing error |

## Webhook Payload

All webhook payloads follow this structure:

```json
{
  "id": "evt_123456789",
  "type": "user.created",
  "created": "2024-01-15T10:30:00Z",
  "data": {
    "object": "user",
    "id": "usr_123456789",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Payload Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier for the webhook event |
| `type` | string | Event type (see Event Types table) |
| `created` | string | ISO 8601 timestamp of the event |
| `data` | object | Event-specific data |

## Setting Up Webhooks

### 1. Create Webhook Endpoint

```http
POST /webhooks
```

Creates a new webhook endpoint.

#### Request Body

```json
{
  "url": "https://your-app.com/webhooks/clearshore",
  "events": ["user.created", "user.updated", "data.processed"],
  "secret": "your_webhook_secret",
  "description": "Production webhook for user events"
}
```

#### Response (201 Created)

```json
{
  "id": "wh_123456789",
  "url": "https://your-app.com/webhooks/clearshore",
  "events": ["user.created", "user.updated", "data.processed"],
  "secret": "whsec_abc123...",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### 2. Verify Webhook Endpoint

When you create a webhook, we'll send a verification request to your endpoint:

```http
POST https://your-app.com/webhooks/clearshore
Content-Type: application/json
X-Clearshore-Signature: sha256=abc123...

{
  "id": "evt_verification",
  "type": "webhook.verification",
  "created": "2024-01-15T10:30:00Z",
  "data": {
    "challenge": "random_challenge_string"
  }
}
```

Your endpoint should respond with the challenge:

```json
{
  "challenge": "random_challenge_string"
}
```

## Event Examples

### User Created

```json
{
  "id": "evt_123456789",
  "type": "user.created",
  "created": "2024-01-15T10:30:00Z",
  "data": {
    "object": "user",
    "id": "usr_123456789",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "status": "active"
  }
}
```

### Data Processed

```json
{
  "id": "evt_123456790",
  "type": "data.processed",
  "created": "2024-01-15T10:35:00Z",
  "data": {
    "object": "data",
    "id": "data_123456789",
    "name": "sales_data.csv",
    "status": "processed",
    "processing_time": 300,
    "output_size": 2048000
  }
}
```

### Data Processing Failed

```json
{
  "id": "evt_123456791",
  "type": "data.failed",
  "created": "2024-01-15T10:35:00Z",
  "data": {
    "object": "data",
    "id": "data_123456789",
    "name": "sales_data.csv",
    "error": {
      "code": "INVALID_FORMAT",
      "message": "Unsupported file format",
      "details": "File appears to be corrupted"
    }
  }
}
```

## Webhook Management

### List Webhooks

```http
GET /webhooks
```

#### Response (200 OK)

```json
{
  "data": [
    {
      "id": "wh_123456789",
      "url": "https://your-app.com/webhooks/clearshore",
      "events": ["user.created", "user.updated"],
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "last_delivery": "2024-01-15T11:30:00Z"
    }
  ]
}
```

### Update Webhook

```http
PUT /webhooks/{webhook_id}
```

#### Request Body

```json
{
  "events": ["user.created", "user.updated", "data.processed"],
  "status": "active"
}
```

### Delete Webhook

```http
DELETE /webhooks/{webhook_id}
```

#### Response (204 No Content)

No response body.

## Security

### Signature Verification

Always verify webhook signatures to ensure requests are from Clearshore:

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

### HTTPS Required

All webhook URLs must use HTTPS. HTTP URLs will be rejected.

## Retry Policy

If your webhook endpoint returns an error (4xx or 5xx status code), we'll retry the delivery:

- **Immediate retry**: 1 second after failure
- **Exponential backoff**: 2, 4, 8, 16, 32 seconds
- **Maximum retries**: 5 attempts
- **Timeout**: 30 seconds per attempt

## Examples

### Node.js Webhook Handler

```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.raw({ type: 'application/json' }));

app.post('/webhooks/clearshore', (req, res) => {
  const signature = req.headers['x-clearshore-signature'];
  const payload = req.body;
  
  // Verify signature
  if (!verifySignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  const event = JSON.parse(payload);
  
  // Handle different event types
  switch (event.type) {
    case 'user.created':
      handleUserCreated(event.data);
      break;
    case 'data.processed':
      handleDataProcessed(event.data);
      break;
    default:
      console.log('Unhandled event type:', event.type);
  }
  
  res.status(200).send('OK');
});
```

### Python Webhook Handler

```python
from flask import Flask, request, jsonify
import hmac
import hashlib

app = Flask(__name__)

@app.route('/webhooks/clearshore', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-Clearshore-Signature')
    payload = request.get_data()
    
    # Verify signature
    if not verify_signature(payload, signature, os.environ['WEBHOOK_SECRET']):
        return 'Invalid signature', 401
    
    event = request.get_json()
    
    # Handle different event types
    if event['type'] == 'user.created':
        handle_user_created(event['data'])
    elif event['type'] == 'data.processed':
        handle_data_processed(event['data'])
    
    return 'OK', 200

def verify_signature(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature, expected)
```
