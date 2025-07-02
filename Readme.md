# Next.js Portal Demo

This project demonstrates a basic portal built with Next.js and NextAuth. It includes product management and user management pages with simple role based access control.
It now uses **Tailwind CSS** for styling.

## Features

- Sign in using credentials handled by **NextAuth**.
- Two predefined users:
  - **admin@example.com** / **adminpass** (admin role)
  - **user@example.com** / **userpass** (user role)
- Product list accessible to any signed in user.
- User management page accessible only to admins.

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.
Tailwind CSS is configured in `styles/globals.css`.

### Backend (Go)

The repository also includes a small Go server exposing the user and product
lists. To run it:

```bash
cd backend
go run main.go
```

The API will be available on `http://localhost:8080`.
