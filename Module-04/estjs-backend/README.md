# ESTJS Backend (Module-04)

NestJS backend demonstrating the request lifecycle with **Middleware**, **Guards**, **Interceptors**, **Pipes**, and **ValidationPipe**.

## Setup & Run

npm install

# .env
PORT=3000
API_KEY=my-secret-api-key-123

npm run start:dev
npm run build

## Request Lifecycle
1. **Middleware** (RequestIdMiddleware): attaches x-request-id header.
2. **Guards** (ApiKeyGuard, RolesGuard): checks x-api-key (401 missing, 403 invalid) and route roles.
3. **Interceptors** (LoggingInterceptor, TimeoutInterceptor): logs method, route, handler, status, and duration; enforces 5000ms timeout (408).
4. **Pipes & Validation** (ParseAreaPipe, ValidationPipe): validates/transforms route params and DTO payloads (400 on invalid input).
5. **Controller & Service**: routes requests and runs business logic.

## Validation & Allowed Areas
- Allowed areas (ParseAreaPipe): Bole, Piassa, Kazanchis, Sarbet, CMC.
- Global ValidationPipe enforces DTO types and rejects unknown properties.

## API Testing & Expected Status Codes
- Missing x-api-key -> 401 Unauthorized
- Wrong x-api-key -> 403 Forbidden
- Valid x-api-key + valid area (/areas/bole) -> 200 OK + x-request-id header
- Invalid area (/areas/invalid) -> 400 Bad Request
- Invalid DTO body -> 400 Bad Request
- Request > 5000ms -> 408 Request Timeout

```bash
curl -i http://localhost:3000/
curl -i -H "x-api-key: wrong-key" http://localhost:3000/
curl -i -H "x-api-key: my-secret-api-key-123" http://localhost:3000/areas/bole
curl -i -H "x-api-key: my-secret-api-key-123" http://localhost:3000/areas/invalid
```
