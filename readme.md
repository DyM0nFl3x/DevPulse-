# DevPulse API

A RESTful Issue Tracking API built with Node.js, Express, TypeScript, and PostgreSQL. DevPulse allows software teams to report bugs, submit feature requests, manage issues, and control access through role-based authorization.

## Live Links

- **API:** `https://my-live-url.com`
- **Repository:** `https://github.com/DyM0nFl3x/DevPulse-.git`
- **Video:** `https://video.com/my-username/devpulse-video`

## Features

* JWT based authentication and authorization
* Role based access control for contributors and maintainers
* Create, read, update, and delete issue management
* Dynamic issue filtering and sorting using query parameters
* Centralized error handling with consistent API responses

## Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* pg
* JWT
* bcrypt
* dotenv

## Authentication

The API uses JSON Web Tokens for authentication.

After a successful login, a JWT token is returned.

Include the token in every protected request.

```http
Authorization: <JWT_TOKEN>
```

## User Roles

### Contributor

* Register
* Login
* Create issues
* View all issues
* View a single issue
* Update only their own issues while the issue status is open

### Maintainer

* All contributor permissions
* Update any issue
* Delete any issue

## Project Structure

```text
└── 📁assignment-2
    └── 📁src
        └── 📁config
            ├── index.ts
        └── 📁db
            ├── index.ts
        └── 📁middleware
            ├── auth.middleware.ts
            ├── globalErrorHandler.ts
        └── 📁modules
            └── 📁auth
                ├── auth.controller.ts
                ├── auth.interface.ts
                ├── auth.route.ts
                ├── auth.service.ts
            └── 📁issues
                ├── issue.controller.ts
                ├── issue.interface.ts
                ├── issue.route.ts
                ├── issue.service.ts
                ├── issue.utils.ts
        └── 📁types
            ├── index.ts
        └── 📁utility
            ├── response.ts
            ├── style.console.ts
        ├── app.ts
        ├── server.ts
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── readme.md
    └── tsconfig.json
```

## API Endpoints

### Authentication

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/auth/signup` | Register a new user |
| POST   | `/api/auth/login`  | Login user          |

### Issues

| Method | Endpoint          | Access                               |
| ------ | ----------------- | ------------------------------------ |
| GET    | `/api/issues`     | Public                               |
| GET    | `/api/issues/:id` | Public                               |
| POST   | `/api/issues`     | Authenticated                        |
| PATCH  | `/api/issues/:id` | Contributor (own issue) / Maintainer |
| DELETE | `/api/issues/:id` | Maintainer                           |

## Query Parameters

### Get All Issues

```http
GET /api/issues
```

Optional query parameters

| Parameter | Values                      |
| --------- | --------------------------- |
| sort      | newest, oldest              |
| status    | open, in_progress, resolved |
| type      | bug, feature_request        |

Example

```http
GET /api/issues?status=open&type=bug&sort=newest
```

## Database Schema

### Users

* id
* name
* email
* password
* role
* created_at
* updated_at

### Issues

* id
* title
* description
* type
* status
* reporter_id
* created_at
* updated_at

## Installation

Clone the repository

```bash
git clone https://github.com/DyM0nFl3x/DevPulse-.git
```

Move into the project

```bash
cd devpulse-
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

DB_URL=your_database_url

JWT_SIGNIN=your_secret_key

EXPIRY=1d
```

Start the development server

```bash
npm run dev
```

## Environment Variables

```env
PORT=3000
DB_URL=postgresql....
JWT_SIGNIN=a036ddfe.......
EXPIRY=1d
```

## Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Something went wrong.",
  "errors": "Error details"
}
```

## Author

Rakib
