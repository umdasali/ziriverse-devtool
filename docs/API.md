# API Documentation

This document describes the API routes available in the application.

## Base URL

```
http://localhost:3000 (development)
https://your-domain.com (production)
```

## API Routes

### POST /api/convert-image

Convert an image from one format to another using Sharp (server-side).

**Endpoint**: `/api/convert-image`

**Method**: `POST`

**Content-Type**: `multipart/form-data`

**Request Body**:
```
FormData {
  file: File (required) - Image file to convert
  format: string (required) - Output format: "png" | "jpeg" | "webp"
  quality: string (required) - Quality level: "1" to "100"
}
```

**Success Response** (200):
```
Content-Type: image/{format}
Content-Length: {size}

[Binary image data]
```

**Error Responses**:

400 Bad Request:
```json
{
  "error": "No file provided"
}
```
```json
{
  "error": "Invalid format"
}
```

500 Internal Server Error:
```json
{
  "error": "Failed to convert image"
}
```

**Example Usage (JavaScript)**:
```javascript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('format', 'webp');
formData.append('quality', '80');

const response = await fetch('/api/convert-image', {
  method: 'POST',
  body: formData,
});

if (response.ok) {
  const blob = await response.blob();
  // Use blob
} else {
  const error = await response.json();
  console.error(error.error);
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:3000/api/convert-image \
  -F "file=@/path/to/image.png" \
  -F "format=webp" \
  -F "quality=80" \
  --output converted.webp
```

---

### POST /api/fetch-meta

Fetch and parse meta tags from a given URL.

**Endpoint**: `/api/fetch-meta`

**Method**: `POST`

**Content-Type**: `application/json`

**Request Body**:
```json
{
  "url": "https://example.com"
}
```

**Success Response** (200):
```json
{
  "metaTags": {
    "title": "Example Domain",
    "description": "Example website description",
    "url": "https://example.com",
    "image": "https://example.com/og-image.jpg",
    "ogTitle": "Example Domain",
    "ogDescription": "Example website description",
    "ogImage": "https://example.com/og-image.jpg",
    "ogUrl": "https://example.com",
    "ogType": "website",
    "ogSiteName": "Example",
    "twitterCard": "summary_large_image",
    "twitterTitle": "Example Domain",
    "twitterDescription": "Example website description",
    "twitterImage": "https://example.com/twitter-image.jpg",
    "twitterSite": "@example",
    "twitterCreator": "@creator"
  }
}
```

**Note**: All fields in `metaTags` are optional. Only present tags will be returned.

**Error Responses**:

400 Bad Request:
```json
{
  "error": "URL is required"
}
```
```json
{
  "error": "Invalid URL"
}
```

408 Request Timeout:
```json
{
  "error": "Request timeout"
}
```

500 Internal Server Error:
```json
{
  "error": "Failed to fetch URL"
}
```
```json
{
  "error": "Failed to fetch meta tags"
}
```

**Example Usage (JavaScript)**:
```javascript
const response = await fetch('/api/fetch-meta', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com',
  }),
});

if (response.ok) {
  const { metaTags } = await response.json();
  console.log(metaTags.title);
} else {
  const error = await response.json();
  console.error(error.error);
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:3000/api/fetch-meta \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

---

## Rate Limiting

**Current Status**: No rate limiting implemented

**Recommended for Production**:
- Image conversion: 10 requests/minute per IP
- Meta fetching: 20 requests/minute per IP

**Implementation Suggestions**:
- Use `@upstash/ratelimit` with Vercel KV
- Or implement custom Redis-based rate limiting
- Return 429 status code when limit exceeded

---

## Error Handling

All API routes follow a consistent error response format:

```json
{
  "error": "Human-readable error message"
}
```

### HTTP Status Codes

- `200 OK` - Success
- `400 Bad Request` - Invalid input
- `408 Request Timeout` - Request took too long
- `429 Too Many Requests` - Rate limit exceeded (if implemented)
- `500 Internal Server Error` - Server error

---

## Security Considerations

### Input Validation

**Image Conversion**:
- File type validated (PNG, JPEG, WEBP only)
- File size should be limited by Next.js config (default 10MB body size)
- Format string must be one of: "png", "jpeg", "webp"
- Quality must be integer 1-100

**Meta Fetching**:
- URL validated with URL constructor
- 10-second timeout prevents hanging requests
- User-Agent header identifies bot
- Only HTTP/HTTPS protocols allowed

### SSRF Protection

**Current Implementation**:
- URLs are validated before fetching
- Timeout prevents long-running requests
- No credentials sent with requests

**Recommended Additions**:
- Block private IP ranges (127.0.0.1, 10.0.0.0/8, etc.)
- Block cloud metadata endpoints
- Whitelist/blacklist specific domains

### CORS

**Current Status**: No CORS headers set (same-origin only)

**To Enable CORS** (add to route handlers):
```typescript
return NextResponse.json(data, {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});
```

---

## Performance

### Image Conversion
- Sharp is highly optimized for performance
- Typical conversion: 100-500ms
- Large images (>10MB): 1-3 seconds

### Meta Fetching
- Network dependent
- Typical request: 500ms-2s
- Timeout: 10 seconds
- No caching implemented (consider adding)

### Caching Recommendations

**Image Conversion**:
- Not recommended (each request is unique)

**Meta Fetching**:
- Cache responses for 1 hour
- Use URL as cache key
- Implement with Redis or Vercel KV
- Clear cache on-demand if needed

---

## Testing

### Testing Image Conversion

```bash
# Valid request
curl -X POST http://localhost:3000/api/convert-image \
  -F "file=@test.png" \
  -F "format=webp" \
  -F "quality=80"

# Invalid format
curl -X POST http://localhost:3000/api/convert-image \
  -F "file=@test.png" \
  -F "format=invalid" \
  -F "quality=80"
```

### Testing Meta Fetching

```bash
# Valid request
curl -X POST http://localhost:3000/api/fetch-meta \
  -H "Content-Type: application/json" \
  -d '{"url":"https://github.com"}'

# Invalid URL
curl -X POST http://localhost:3000/api/fetch-meta \
  -H "Content-Type: application/json" \
  -d '{"url":"not-a-url"}'

# Missing URL
curl -X POST http://localhost:3000/api/fetch-meta \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## Future API Endpoints

Potential additions:

### POST /api/generate-css
Generate CSS file from branding configuration (currently done client-side).

### GET /api/health
Health check endpoint for monitoring.

### POST /api/batch-convert
Convert multiple images in one request.

### GET /api/fonts
List available font families.
