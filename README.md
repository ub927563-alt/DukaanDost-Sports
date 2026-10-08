# DukaanDost Sports — Frontend

A student-friendly React/Vite frontend for the DukaanDost Lite full-stack project, adapted to a sports accessories store.

## Tech Stack

- React
- Vite
- React Router
- Axios
- CSS
- Browser localStorage for frontend demo state

## Pages

- Home
- Products and category filter
- Product details
- Cart
- Checkout
- Login
- Register
- My Orders
- Seller Dashboard
- AI Store Assistant UI

## Run Locally

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

http://localhost:5173

## Backend Connection

The frontend is prepared for a Node.js + Express backend.

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

The current demo uses localStorage for cart, registration and orders so the frontend can be viewed before the backend is connected.

## Required backend endpoints from the course manual

The final backend should connect to:

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/settings
- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
- POST /api/orders
- GET /api/orders/my
- GET /api/orders
- PATCH /api/orders/:id/status
- PATCH /api/orders/:id/cancel
- POST /api/chat
- POST /api/reviews
- GET /api/products/:id/reviews

## Important

This is the frontend portion. The course manual requires the complete project to use React/Vite, Node.js/Express and a database, with authentication, products, cart/checkout, order management, AI assistant and review sentiment analysis.
