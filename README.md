# Duka

A full-stack e-commerce app I built to get hands-on with the MERN stack
(MongoDB, Express, React, Node) beyond just following tutorials — auth,
cart state, checkout, the works. "Duka" is Swahili for "shop".

## Why I built it this way

I wanted a project that actually touches the parts of a real store that
are easy to gloss over in a tutorial: what happens when someone adds an
item to the cart before logging in, what an order actually needs to
store (shipping address, item snapshot at time of purchase, not just a
product reference), and how to keep the cart in sync with localStorage
so a refresh doesn't wipe someone's cart.

## Stack
- **Frontend:** React (Vite), Tailwind, React Router, Axios
- **Backend:** Node/Express, MongoDB via Mongoose
- **Auth:** JWT, with an `isAdmin` flag for product management

## What it does
- Browse and search products
- Product detail pages with stock-aware "add to cart"
- Cart persisted in localStorage (survives refresh, syncs on login)
- Register/login with JWT
- Checkout flow that creates a real order document in MongoDB
- Order history for the logged-in user
- Admin-only product create/update/delete routes

## Running it locally

You'll need a MongoDB connection string — I used a free
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster for this.

**Backend:**
```bash
cd server
npm install
cp .env.example .env     # fill in MONGO_URI and JWT_SECRET
npm run dev               # http://localhost:5000
```

Optional — seed a few sample products so the store isn't empty:
```bash
node seed.js
```

**Frontend:**
```bash
cd client
npm install
npm run dev                # http://localhost:5173
```

Run both at once (two terminals). The Vite dev server proxies `/api`
calls to the backend.

## Making yourself an admin
Register normally, then flip the flag directly in MongoDB (Atlas UI or
`mongosh`):
```js
db.users.updateOne({ email: "you@example.com" }, { $set: { isAdmin: true } })
```

## Things I'd add if I kept going
- Product images through Cloudinary instead of placeholder boxes
- Real payment integration (was looking at M-Pesa's Daraja API, since
  that's what most e-commerce here actually uses)
- Reviews/ratings on products
- An actual admin dashboard UI instead of hitting the API routes directly

## Project structure
```
server/   Express API (MongoDB/Mongoose, JWT auth)
client/   React app (Vite, Tailwind, React Router)
```
