
# The Shelf — Bookhub Frontend

A simple Angular 17 frontend for managing a library's book catalog. Built with standalone components and reactive forms.

![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)

## Overview

Two main pages:

- **Catalog** — shows all books.
- **Add / Edit Book** — one reusable form for adding a new book or editing an existing one. It can be used as a standalone routed page or embedded inside another component.

## Features

- Reactive forms with full validation (required, min/max length, min value).
- Clear handling of server errors (400 / 404 / generic failures).
- Duplicate ISBN errors are shown right under the ISBN field.
- Clean project structure (models / services / components).

## Tech Stack

- Angular 17 (standalone components)
- Reactive Forms
- Angular HttpClient
- Angular Router
- TypeScript

## Project Structure

```
src/app/
 ├── models/book.model.ts          # Book / AddBookDto / UpdateBookDto
 ├── services/book.service.ts      # All API calls (CRUD)
 ├── components/book-list/         # Catalog page
 └── components/book-form/         # Add / Edit page
src/environments/environment.ts    # Backend URL goes here
```

## Getting Started

**Requirements:** Node.js 18+ and Angular CLI

```bash
npm install
npm start
```

The app runs at `http://localhost:4200`.

## Connecting the Backend

Set your API URL in `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api/books'   // change this
};
```

### Expected API (RESTful)

| Method | Route              | Purpose      |
| ------ | ------------------ | ------------ |
| GET    | `/api/books`        | List all books |
| GET    | `/api/books/{id}`   | Get one book |
| POST   | `/api/books`        | Create a book |
| PUT    | `/api/books/{id}`   | Update a book |
| DELETE | `/api/books/{id}`   | Delete a book |

### Book JSON shape

```json
{
  "id": 1,
  "title": "string",
  "author": "string",
  "isbn": "string",
  "category": "string",
  "availableCopies": 0
}
```

### CORS

The backend must allow the frontend's origin (`http://localhost:4200`), or requests will be blocked by the browser. Example for ASP.NET Core:

```csharp
builder.Services.AddCors(o => o.AddPolicy("AllowFrontend", p =>
    p.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()));
// ...
app.UseCors("AllowFrontend");
```

### Duplicate ISBN

The frontend reads the error message from the server response and displays it under the ISBN field. If your backend uses a different field name for the message, update the matching logic in:

```
src/app/components/book-form/book-form.component.ts → handleError()
```

## Client-side Validation

- **Title / Author**: required, 3–200 characters.
- **ISBN**: required, up to 20 characters (duplicate check happens on the server).
- **Category**: required, 2–200 characters.
- **Available Copies**: number, cannot be negative.

## Deployment

Deployment setup for this project was configured with help from **Claude** (Anthropic). Before building for production, make sure `environment.prod.ts` points to your real API URL:

```bash
ng build --configuration production
```

## Contributing

PRs and suggestions are welcome. For bigger changes, please open an issue first.

## License

MIT
