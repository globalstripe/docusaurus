# Interactive API Documentation

Welcome to the interactive API documentation! This page provides a fully interactive interface where you can explore, test, and experiment with the Clearshore API endpoints directly from your browser.

## 🚀 Try It Out

The interactive documentation below allows you to:

- **Browse all endpoints** with detailed descriptions
- **Test API calls** directly from the interface
- **View request/response schemas** with examples
- **Authenticate** using your API key
- **Download the OpenAPI spec** for your tools

## Getting Started

1. **Get an API Key**: If you don't have one yet, sign up for a Clearshore account and generate an API key
2. **Authenticate**: Click the "Authorize" button in the interface below and enter your API key
3. **Explore**: Browse the endpoints and try making requests
4. **Test**: Use the "Try it out" buttons to test different endpoints

## Interactive Documentation

The interactive API documentation is available at: **[Interactive API Documentation](/api-interactive.html)**

<iframe 
  src="/api-interactive.html" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border: 1px solid #e1e5e9; border-radius: 8px;"
  title="Interactive API Documentation">
</iframe>

## Features

### 🔍 **Endpoint Explorer**
- Organized by categories (Health, Users, Data, Webhooks)
- Detailed descriptions and examples for each endpoint
- Request/response schemas with validation rules

### 🧪 **Live Testing**
- Test endpoints directly from the interface
- Fill in request parameters and body
- See real-time responses
- Copy cURL commands for your applications

### 🔐 **Authentication**
- Secure API key authentication
- Test with different API keys
- See authentication requirements for each endpoint

### 📊 **Response Examples**
- Sample requests and responses
- Error handling examples
- Status code explanations

## API Categories

### Health Check
- **GET /health** - Check API status and service health

### User Management
- **GET /users** - List users with pagination and filtering
- **POST /users** - Create new user accounts
- **GET /users/{id}** - Retrieve specific user details
- **PUT /users/{id}** - Update user information
- **DELETE /users/{id}** - Delete user accounts

### Data Processing
- **POST /data/upload** - Upload data files for processing
- **POST /data/{id}/process** - Initiate data processing
- **GET /data/{id}/status** - Check processing status
- **GET /data/{id}/download** - Download processed results

### Webhooks
- **GET /webhooks** - List webhook endpoints
- **POST /webhooks** - Create new webhook endpoints
- **PUT /webhooks/{id}** - Update webhook configuration
- **DELETE /webhooks/{id}** - Remove webhook endpoints

## Rate Limits

The interactive documentation shows rate limits for each endpoint:

- **Health Check**: No limits
- **User Management**: 100 requests/hour
- **Data Processing**: 10 uploads/hour, 5 concurrent jobs
- **Webhooks**: 100 requests/hour

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "error_code",
  "message": "Human-readable error message",
  "details": {
    "field": "additional_error_details"
  }
}
```

## Next Steps

1. **Explore the endpoints** using the interactive interface above
2. **Test with your API key** to see real responses
3. **Download the OpenAPI spec** for integration with your tools
4. **Check out our SDKs** for easier integration in your applications

## Support

Need help with the API? Check out our [API Reference](/api/reference) for detailed documentation, or contact our support team at support@clearshore.com.

---

*This interactive documentation is powered by Redoc and automatically generated from our OpenAPI specification.*
