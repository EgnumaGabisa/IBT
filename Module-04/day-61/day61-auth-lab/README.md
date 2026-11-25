# NestJS JWT Authentication System (Day 61 Lab)

A secure, production-ready authentication REST API built with **NestJS**, **Passport-JWT**, and **Argon2** for password hashing and token rotation.

## Features

- **Secure Password Hashing:** Uses `argon2` to safely hash user passwords before storage.
- **Dual-Token Architecture:** Issues short-lived Access Tokens (`15m`) and long-lived Refresh Tokens (`7d`).
- **Refresh Token Rotation:** Hashes and stores refresh tokens in memory, invalidating old tokens upon rotation to mitigate reuse risks.
- **Global Route Protection:** Implements a global `JwtAuthGuard` alongside a custom `@Public()` decorator to allow selective public endpoint access (`/register`, `/login`, `/refresh`).
- **Validation Pipes:** Enforces strict data transfer objects (DTOs) via `class-validator` and `class-transformer`.
- **Session Termination:** Support for active user logout by invalidating stored refresh hashes.

---

## API Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user with hashed password |
| `POST` | `/api/auth/login` | Public | Authenticate credentials and receive tokens |
| `POST` | `/api/auth/refresh` | Public | Exchange a valid Refresh Token for a new token pair |
| `GET` | `/api/auth/me` | Protected | Fetch current authenticated user payload |
| `POST` | `/api/auth/logout` | Protected | Revoke stored refresh token hash and end session |

---

## Project Architecture & Workflows

### Authentication Flow
1. **Registration:** User details are sent to `/auth/register`. The password is encrypted using Argon2 before saving to memory.
2. **Login:** `/auth/login` verifies credentials via `argon2.verify()`. Upon validation, signed Access and Refresh JWTs are returned.
3. **Protected Routes:** Requests to `/auth/me` require an `Authorization: Bearer <access_token>` header, verified by `JwtStrategy`.
4. **Token Refresh:** `/auth/refresh` validates the incoming refresh token against its hashed counterpart, issuing fresh tokens upon match.
5. **Logout:** `/auth/logout` clears the user's `refreshHash`, terminating session rotation capabilities.

---

## Getting Started

### 1. Environment Setup
Create a `.env` file in the root directory:

```env
PORT=3000
JWT_ACCESS_SECRET=your_jwt_access_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here