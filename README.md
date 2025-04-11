# Policy Management Application

## Overview
The **Policy Management Application** is a full-stack CRUD system that enables users to manage insurance policies. It provides a secure, responsive interface for creating, viewing, updating, and deleting policies.

- **Frontend**: Angular (latest version)
- **Backend**: ASP.NET Core Web API
- **Database**: SQL Server using Entity Framework Core

---

////////////////////////////////////////////////////////////////////////////////
✅ Default Login Credentials:

### Username: `admin`
### Password: `password`
////////////////////////////////////////////////////////////////////////////////

---

## Features

- **User Authentication** via JWT (stored securely in HttpOnly cookies)
- **CRUD Operations** for managing policies
- **Secure API Routes** protected with authorization middleware
- **Responsive UI** using Bootstrap for mobile and desktop
- **Separation of Concerns** with a clean API and service structure
- **Multi-Tenancy** support for isolating policy data per business unit

---

## Technologies Used

### Frontend:
- Angular (latest)
- Bootstrap
- RxJS
- HttpClientModule
- Reactive Forms

### Backend:
- ASP.NET Core (latest)
- Entity Framework Core
- SQL Server
- JWT Authentication

---

## Prerequisites

### Backend:
- .NET SDK (v9.0.202 or later)
- SQL Server (local or remote)
- SQL Server Management Studio (SSMS)

### Frontend:
- Node.js (v16.x or later)
- npm (comes with Node.js)
- Angular CLI:
  npm install -g @angular/cli

---

## Setup Instructions

### 1. Backend Setup (ASP.NET Core)

1.1 Clone the Repository:
`git clone https://github.com/jadabiraji/policy-management.git`
`cd policy-management/PolicyManagementApp/PolicyManagement.API`

1.2 Configure the Database Connection:
Edit appsettings.json and set the connection string:
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=PolicyManagementDb;Trusted_Connection=True;TrustServerCertificate=True;"
}

1.3 Run Entity Framework Migrations:
dotnet ef database update

1.4 Start the Backend Server:
dotnet run

The API will be available at:
`http://localhost:5067`

🔍 Swagger Documentation:
Live API docs are enabled at:
`http://localhost:5067/swagger/index.html`

You can:
- Browse all available endpoints
- View request/response schemas
- Test API calls directly

---

### 2. Frontend Setup (Angular)

2.1 Install Dependencies:
cd ../policy-management-ui
npm install

2.2 Configure the API URL:
Edit src/environments/environment.ts:
export const environment = {
  production: false,
  apiUrl: `http://localhost:5067/api`
};

2.3 Start the Angular App:
ng serve

The frontend will be available at:
`http://localhost:4200`

---

## 🔄 Application Flow

### 1. Login
- User logs in using the default credentials.
- A JWT is returned and stored in an HttpOnly cookie for security.

### 2. Policy Management
- Create: Submit the policy form.
- Read: View the list of existing policies.
- Update: Edit a policy.
- Delete: Remove a policy.

### 3. Security
- All API routes are protected with [Authorize].
- Cookies are HttpOnly to prevent token theft via XSS.

---

## Multi-Tenancy Support

This app supports multi-tenancy — each user operates within a separate business context.

- Policies are isolated per tenant.
- API logic enforces tenant-bound operations.
- Field: `sender_businessName` is used to associate requests.

---

## API Endpoints

### Authentication:
| Method | Endpoint                      | Description               |
|--------|-------------------------------|---------------------------|
| POST   | /api/auth/login               | Login and receive JWT     |
| GET    | /api/auth/validate-token      | Validate current session  |

### Policies:
| Method | Endpoint                      | Description                  |
|--------|-------------------------------|------------------------------|
| GET    | /api/policies                | Get all policies `with Pagination` |
| GET    | /api/policies/{id}           | Get a specific policy        |
| POST   | /api/policies                | Create a new policy          |
| PUT    | /api/policies/{id}           | Update an existing policy    |
| DELETE | /api/policies/{id}           | Delete a policy              |
