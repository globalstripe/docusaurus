# Data Processing API

The Data Processing API provides endpoints for uploading, processing, and managing data files in the Clearshore platform.

## Authentication

All endpoints require authentication:

```http
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### Upload Data

```http
POST /data/upload
```

Uploads a data file for processing.

#### Request

**Content-Type**: `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | file | Yes | The data file to upload |
| `type` | string | Yes | Data type (`csv`, `json`, `xml`, `excel`) |
| `name` | string | No | Custom name for the dataset |
| `description` | string | No | Description of the data |

#### Response (201 Created)

```json
{
  "id": "data_123456789",
  "name": "sales_data.csv",
  "type": "csv",
  "size": 1024000,
  "status": "uploaded",
  "created_at": "2024-01-15T10:30:00Z",
  "processing": {
    "status": "pending",
    "estimated_completion": "2024-01-15T10:35:00Z"
  }
}
```

### Process Data

```http
POST /data/{data_id}/process
```

Initiates processing of an uploaded data file.

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data_id` | string | Yes | Unique identifier for the data file |

#### Request Body

```json
{
  "operations": [
    {
      "type": "clean",
      "parameters": {
        "remove_duplicates": true,
        "fill_missing": "mean"
      }
    },
    {
      "type": "transform",
      "parameters": {
        "normalize": true,
        "scale": "standard"
      }
    }
  ],
  "output_format": "json"
}
```

#### Response (202 Accepted)

```json
{
  "job_id": "job_123456789",
  "status": "processing",
  "estimated_completion": "2024-01-15T10:35:00Z",
  "progress": 0
}
```

### Get Processing Status

```http
GET /data/{data_id}/status
```

Retrieves the current processing status of a data file.

#### Response (200 OK)

```json
{
  "id": "data_123456789",
  "status": "processing",
  "progress": 75,
  "current_operation": "transform",
  "started_at": "2024-01-15T10:30:00Z",
  "estimated_completion": "2024-01-15T10:35:00Z",
  "operations_completed": 2,
  "total_operations": 3
}
```

### Download Processed Data

```http
GET /data/{data_id}/download
```

Downloads the processed data file.

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `format` | string | No | Output format (`json`, `csv`, `excel`) |

#### Response (200 OK)

**Content-Type**: `application/octet-stream`

The processed data file as a binary stream.

### List Data Files

```http
GET /data
```

Retrieves a list of uploaded data files.

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number |
| `limit` | integer | No | 20 | Number of files per page |
| `type` | string | No | - | Filter by data type |
| `status` | string | No | - | Filter by processing status |

#### Response (200 OK)

```json
{
  "data": [
    {
      "id": "data_123456789",
      "name": "sales_data.csv",
      "type": "csv",
      "size": 1024000,
      "status": "processed",
      "created_at": "2024-01-15T10:30:00Z",
      "processed_at": "2024-01-15T10:35:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

## Processing Operations

### Available Operations

| Operation | Description | Parameters |
|-----------|-------------|------------|
| `clean` | Data cleaning operations | `remove_duplicates`, `fill_missing`, `remove_outliers` |
| `transform` | Data transformation | `normalize`, `scale`, `encode` |
| `aggregate` | Data aggregation | `group_by`, `aggregate_functions` |
| `filter` | Data filtering | `conditions`, `date_range` |
| `validate` | Data validation | `schema`, `rules` |

### Example Processing Pipeline

```json
{
  "operations": [
    {
      "type": "clean",
      "parameters": {
        "remove_duplicates": true,
        "fill_missing": "mean",
        "remove_outliers": true
      }
    },
    {
      "type": "transform",
      "parameters": {
        "normalize": true,
        "scale": "standard",
        "encode_categorical": true
      }
    },
    {
      "type": "aggregate",
      "parameters": {
        "group_by": ["category", "region"],
        "aggregate_functions": {
          "sales": "sum",
          "profit": "mean"
        }
      }
    }
  ]
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "validation_error",
  "message": "Invalid file format",
  "details": {
    "field": "file",
    "message": "Only CSV, JSON, and Excel files are supported"
  }
}
```

### 413 Payload Too Large

```json
{
  "error": "file_too_large",
  "message": "File size exceeds maximum limit",
  "max_size": "100MB"
}
```

### 422 Unprocessable Entity

```json
{
  "error": "processing_failed",
  "message": "Data processing failed",
  "details": {
    "operation": "clean",
    "error": "Invalid data format in column 'date'"
  }
}
```

## Rate Limiting

- **Upload**: 10 files per hour
- **Processing**: 5 concurrent processing jobs
- **Download**: 100 requests per hour

## Examples

### JavaScript

```javascript
// Upload a file
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('type', 'csv');
formData.append('name', 'sales_data');

const response = await fetch('https://api.clearshore.com/v1/data/upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const result = await response.json();
console.log('Uploaded:', result);
```

### Python

```python
import requests

# Upload a file
with open('data.csv', 'rb') as f:
    files = {'file': f}
    data = {
        'type': 'csv',
        'name': 'sales_data',
        'description': 'Monthly sales data'
    }
    
    response = requests.post(
        'https://api.clearshore.com/v1/data/upload',
        headers={'Authorization': 'Bearer YOUR_API_KEY'},
        files=files,
        data=data
    )

result = response.json()
print('Uploaded:', result)
```
