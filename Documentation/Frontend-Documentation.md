# Policy Management UI – Frontend Documentation (Angular)

This is the frontend for the Policy Management App built with Angular, styled using Bootstrap, and structured using a modular, feature-based architecture. It supports user authentication, policy CRUD operations, and clean API integration using strongly-typed models.

## Project Structure

src/
└── app/
    ├── core/
    │   ├── guards/                      # Route guards (auth protection)
    │   ├── interceptors/                # HTTP interceptors (e.g. JWT, errors)
    │   └── services/
    │       └── auth.service.ts          # Handles login, logout, and token validation
    │
    ├── pages/
    │   ├── login/
    │   │   ├── login.component.ts       # Login form logic
    │   │   └── login.component.html     # Login UI
    │   │
    │   └── policy-management/
    │       ├── policy-form/
    │       │   ├── policy-form.component.ts
    │       │   ├── policy-form.component.html
    │       │   ├── policy-form.component.scss
    │       │   ├── policy-form.component.spec.ts
    │       │   └── policy-form.service.ts
    │       │
    │       ├── policy-list/
    │       │   ├── policy-list.component.ts
    │       │   ├── policy-list.component.html
    │       │   ├── policy-list.component.scss
    │       │   ├── policy-list.component.spec.ts
    │       │   └── policy-list.service.ts
    │       │
    │       ├── policy-management.module.ts
    │       └── policy-management-routing.module.ts
    │
    ├── shared/
    │   ├── components/
    │   │   └── loading-spinner/
    │   │       ├── loading-spinner.component.ts
    │   │       ├── loading-spinner.component.html
    │   │       └── loading-spinner.component.css
    │   │
    │   ├── models/
    │   │   ├── common/
    │   │   │   ├── base-response.model.ts
    │   │   │   └── policy-type.model.ts
    │   │   └── http/policy-management/
    │   │       ├── policy-create/
    │   │       ├── policy-delete/
    │   │       ├── policy-get/
    │   │       ├── policy-get-by-id/
    │   │       └── policy-update/
    │   │
    │   ├── pipes/
    │   └── services/
    │       ├── policy-management.service.ts
    │       ├── common.service.ts
    │       ├── error-handler.service.ts
    │       ├── generic-loading.service.ts
    │       └── shared-snackbar.service.ts
    │
    ├── shared.module.ts
    ├── app-routing.module.ts
    └── app.component.html

## Authentication Flow

- JWT is stored in an HttpOnly cookie.
- auth.service.ts manages login, logout, and session validation.
- An interceptor sends credentials with every request.
- Guarded routes are protected via AuthGuard.

## Routes

Path               | Component               | Auth Required
------------------ | ----------------------- | --------------
/login             | LoginComponent          | No
/policies          | PolicyListComponent     | Yes
/policies/:id      | PolicyFormComponent     | Yes
/policies/new      | PolicyFormComponent     | Yes

## Models

Models are stored under shared/models/, grouped by endpoint. Each folder includes:
- request.model.ts
- response.model.ts

All responses extend:

export interface BaseResponse {
  errorCode: string;
  errorMessage: string;
}

## Shared Services

Service                        | Purpose
----------------------------- | -----------------------------------------------------
policy-management.service.ts  | Central API logic for policies
shared-snackbar.service.ts    | Shows feedback messages
generic-loading.service.ts    | Triggers loading spinner globally
error-handler.service.ts      | Handles HTTP/API errors
auth.service.ts               | Login/logout/token validation

## Developer Notes

- Use shared.module.ts to export shared components and services.
- Group views by feature in pages/.
- Use model folders for 1:1 backend types.
- Use pipes/services/components from shared/ across the app.

## Getting Started

npm install
ng serve
`http://localhost:4200`

## Generate Docs

npx compodoc -p tsconfig.json -s
  `http://localhost:8080`