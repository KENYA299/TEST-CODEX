# Asa (Private Admin-Only Campaign System)

Asa is a **full stack private admin-only web app** built with:

- Frontend: React (Vite) + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: Admin secret key only (`0889`) + JWT session
- PWA: Manifest + Service Worker

## Project Structure

```
.
├── client
│   ├── public
│   └── src
├── server
│   └── src
└── README.md
```

## Features

- Admin login with secret key (no public registration)
- Dashboard after login
- Campaign creation form with:
  - Platform
  - Country multi-select
  - Campaign type
  - Goal
  - Quantity
  - Duration
  - Daily pacing control
  - Revenue tracking
- Campaign list view
- Campaign edit and delete
- Basic analytics summary cards
- PWA enabled (manifest + service worker)

## Setup

### 1) Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Server runs on `http://localhost:5000`.

### 2) Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Client runs on `http://localhost:5173`.

## Authentication

- Login endpoint accepts only one admin secret key.
- Default key in `.env.example`: `0889`
- JWT token is issued after successful login and must be included in protected API requests.

## API Endpoints

- `POST /api/auth/login`
- `GET /api/auth/session` (protected)
- `GET /api/campaigns` (protected)
- `POST /api/campaigns` (protected)
- `PUT /api/campaigns/:id` (protected)
- `DELETE /api/campaigns/:id` (protected)
- `GET /api/campaigns/analytics/summary` (protected)

## Notes

- This is intentionally a private admin-only system.
- No public user access, no registration flow, no payment system.
