# Full Stack SaaS Starter (React + Express + MongoDB)

This repository contains a full stack SaaS starter application with:

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Authorization:** Role-based (`user`, `admin`)

## Project Structure

```text
.
├── client
│   ├── src
│   └── .env.example
├── server
│   ├── src
│   └── .env.example
└── README.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB running locally or accessible via URI

## Environment Variables

### Server (`server/.env`)

Create `.env` from `.env.example`:

```bash
cp server/.env.example server/.env
```

Values:

- `PORT` - API port (default: `5000`)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret used to sign JWT tokens
- `ADMIN_CREATION_KEY` - Required when registering admin users

### Client (`client/.env`)

Create `.env` from `.env.example`:

```bash
cp client/.env.example client/.env
```

Values:

- `VITE_API_URL` - API base URL (default: `http://localhost:5000/api`)

## Installation

### 1) Install backend dependencies

```bash
cd server
npm install
```

### 2) Install frontend dependencies

```bash
cd ../client
npm install
```

## Running the app

### Start backend

```bash
cd server
npm run dev
```

### Start frontend

```bash
cd client
npm run dev
```

Open `http://localhost:5173` in your browser.

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Protected
- `GET /api/protected/dashboard` (user or admin)
- `GET /api/protected/admin` (admin only)

## Notes

- JWT token and user profile are stored in browser local storage.
- Admin registration requires the same key as `ADMIN_CREATION_KEY`.
- Unauthorized users are redirected to login.
