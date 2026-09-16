
# The Shelf — Bookhub Frontend

A simple and responsive **Angular 17** frontend for managing a bookstore's book catalog.
The application provides a clean interface for viewing, adding, editing, and deleting books through a RESTful backend API.

Built using **standalone components**, **Reactive Forms**, and Angular's **HttpClient** and **Router**.

![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript\&logoColor=white)

## Overview

The application provides two main pages:

* **Catalog** — displays all available books with their details and actions.
* **Add / Edit Book** — a reusable form used for both creating a new book and updating an existing book.

The frontend communicates with the Bookhub ASP.NET Core Web API using HTTP requests.

## Features

* View the complete book catalog.
* Add a new book.
* Edit an existing book.
* Delete a book.
* Reactive form validation.
* Client-side validation before submitting requests.
* Server-side error handling.
* Duplicate ISBN errors displayed directly under the ISBN field.
* 404 handling when a requested book does not exist.
* Loading and error states.
* Reusable Add/Edit form component.
* Angular routing.
* REST API integration using `HttpClient`.
* Standalone Angular components.

## Tech Stack

* Angular 17
* TypeScript
* Reactive Forms
* Angular HttpClient
* Angular Router
* HTML5
* CSS

## Project Structure

```text
src/
└── app/
    ├── models/
    │   └── book.model.ts
    │
    ├── services/
    │   └── book.service.ts
    │
    └── components/
        ├── book-list/
        │   ├── book-list.component.ts
        │   ├── book-list.component.html
        │   └── book-list.component.css
        │
        └── book-form/
            ├── book-form.component.ts
            ├── book-form.component.html
            └── book-form.component.css

src/environments/
└── environment.ts
```

### Models

`book.model.ts` contains the TypeScript interfaces used by the application, including:

* `Book`
* `AddBookDto`
* `UpdateBookDto`

### Book Service

`book.service.ts` is responsible for communicating with the backend API.

It contains the HTTP operations required for:

* Getting books
* Getting a book by ID
* Adding a book
* Updating a book
* Deleting a book

### Book List

The catalog component retrieves books from the API and displays them to the user.

It also provides actions for:

* Editing a book
* Deleting a book
* Navigating to the Add Book page

### Book Form

The same form component is used for both **Add** and **Edit** operations.

The component determines the current mode from the route and loads the existing book data when editing.

## Book Data

Each book contains:

| Property          | Type     | Description                        |
| ----------------- | -------- | ---------------------------------- |
| `id`              | `number` | Unique book identifier             |
| `title`           | `string` | Book title                         |
| `author`          | `string` | Book author                        |
| `isbn`            | `string` | International Standard Book Number |
| `category`        | `string` | Book category                      |
| `availableCopies` | `number` | Number of available copies         |

## Form Validation

The frontend performs client-side validation before sending requests to the API.

### Title

* Required
* Minimum 3 characters
* Maximum 200 characters

### Author

* Required
* Minimum 3 characters
* Maximum 200 characters

### ISBN

* Required
* Maximum 20 characters
* Duplicate ISBN validation is handled by the backend

### Category

* Required
* Minimum 2 characters
* Maximum 200 characters

### Available Copies

* Required
* Must be a number
* Cannot be negative

Validation messages are displayed next to the corresponding fields to provide immediate feedback.

## API Integration

The backend API URL is configured through:

```text
src/environments/environment.ts
```

Example:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api/books'
};
```

Change the URL according to the backend environment.

## API Endpoints

The frontend consumes the following RESTful endpoints:

| Method   | Endpoint          | Purpose         |
| -------- | ----------------- | --------------- |
| `GET`    | `/api/books`      | Retrieve books  |
| `GET`    | `/api/books/{id}` | Retrieve a book |
| `POST`   | `/api/books`      | Create a book   |
| `PUT`    | `/api/books/{id}` | Update a book   |
| `DELETE` | `/api/books/{id}` | Delete a book   |

## Error Handling

The application handles common API errors:

### `400 Bad Request`

Used for validation failures and business validation errors.

For example, when the ISBN already exists, the backend error is displayed directly under the ISBN field.

### `404 Not Found`

Displayed when the requested book does not exist.

### Other Errors

Unexpected server errors are handled and displayed as a general error message instead of leaving the user without feedback.

## CORS

When running the frontend and backend locally, they normally use different origins.

The backend must allow:

```text
http://localhost:4200
```

For ASP.NET Core, the backend can configure CORS to allow requests from the Angular development server.

## Getting Started

### Requirements

* Node.js 18+
* npm
* Angular CLI

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
npm start
```

The application will be available at:

```text
http://localhost:4200
```

## Connecting to the Backend

Make sure the backend API is running and update:

```text
src/environments/environment.ts
```

with the correct API URL.

The complete application flow is:

```text
Angular Frontend
      │
      │ HTTP
      ▼
ASP.NET Core Web API
      │
      ▼
SQL Server
```

## Production Build

To create a production build:

```bash
ng build --configuration production
```

Before building, make sure the production environment contains the correct backend API URL.

## Deployment

The frontend can be deployed to any static hosting platform that supports Angular applications.

When deploying, make sure that:

1. The production API URL is configured correctly.
2. The backend allows the deployed frontend origin through CORS.
3. The application is built using the production configuration.

## Assessment Requirements

The frontend covers the required bookstore management functionality:

* [x] Display books
* [x] Add a book
* [x] Edit a book
* [x] Delete a book
* [x] Reactive form validation
* [x] API integration
* [x] Server error handling
* [x] Duplicate ISBN error handling
* [x] Reusable Add/Edit form

## Related Project

**Backend:** BookHub API — ASP.NET Core Web API

The backend provides the RESTful API consumed by this Angular application.

## Author

**Yomna Mohamed Fathy**

Computer Science Graduate | .NET Backend Developer

GitHub: [yomnamohamed07](https://github.com/yomnamohamed07)

