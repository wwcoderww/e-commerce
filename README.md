# E-Commerce Store

A full-stack online store built with React and Next.js, with product browsing, cart management, checkout, order history, and an admin product dashboard.

**Live applications:** [Storefront](https://store.ezwezz.com) · [Backend API](https://api2.ezwezz.com)

## Overview

This project brings together a responsive storefront and an Express API backed by PostgreSQL. Customers can browse and filter products, manage a cart, complete a checkout form, and look up purchase history. Admin users can create, edit, and delete products.

## Features

- Product catalog with search, sorting, and product detail views
- Cart controls for adding products, changing quantities, and removing items
- Cart state managed with Redux Toolkit and synchronized with the API
- Sign-up and sign-in using Better Auth
- Form validation for authentication and checkout flows
- Checkout that saves purchases and shipping details
- Order history lookup and delivery-status display
- Admin dashboard for creating, editing, and deleting products
- Responsive navigation and layouts for mobile and desktop
- Loading and error states, plus toast notifications
- End-to-end browser tests and backend integration tests

## Tech Stack

### Frontend

- Next.js and React
- TypeScript
- Tailwind CSS
- Redux Toolkit and RTK Query
- React Hook Form
- Better Auth client
- Sonner and Lucide React
- Playwright

### Backend

- Node.js and Express
- TypeScript
- PostgreSQL and Drizzle ORM
- Better Auth
- Zod
- AWS S3 for product image storage
- Vitest and Supertest

### Infrastructure

- Docker and Docker Compose
- GitHub Actions
- GitHub Container Registry

## Enviroment Variables

### Backend

DATABASE_URL=postgresql://localhost:5432/store_db
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BACKEND_URL=http://localhost:8080
FRONTEND_URL=http://localhost:3000
NODE_PORT=8080
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
AWS_BUCKET_NAME=your-bucket-name
AWS_REGION=your-aws-region

### Frontend

NEXT_PUBLIC_BACKEND_URL=http://localhost:8080

## API

`*` | `/auth/*` | Better Auth sign-up, sign-in, and session endpoints |
`GET` | `/products` | Retrieve products |
`POST` | `/products` | Create a product (admin) |
`PUT` | `/products/:id` | Update a product (admin) |
`DELETE` | `/products/:id` | Delete a product (admin) |
`GET` | `/cart/:id` | Retrieve a cart |
`POST` | `/cart` | Save cart items |
`POST` | `/cart/sync` | Synchronize cart data |
`PUT` | `/cart` | Update cart items |
`DELETE` | `/cart` | Clear cart data |
`POST` | `/history` | Save a purchase |
`GET` | `/history/user/:id` | Retrieve a user's purchase history |
`GET` | `/history/:id` | Retrieve a purchase by ID |

## What This Project Demonstrates

- Building reusable React components and multi-page user flows
- Managing shared client state and server data with Redux Toolkit and RTK Query
- Connecting a TypeScript frontend to REST endpoints
- Handling forms, validation, loading states, and errors
- Structuring and testing a full-stack application
