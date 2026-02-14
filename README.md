# Bellcorp Events

A full stack event management application built with the MERN stack.

## Tech Stack

- Frontend: React.js
- Backend: Node.js and Express.js
- Database: SQLite
- Authentication: JWT and bcryptjs

## Project Structure
```
root/
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   └── server.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│   └── package.json
└── README.md
```

## Features

- User Registration and Login
- Browse Events
- Search events by name
- Filter events by category and location
- Register for events
- Cancel event registration
- User Dashboard with upcoming and past events

## How to Run Locally

### Backend
```
cd server
npm install
npm run dev
```

### Frontend
```
cd client
npm install
npm start
```

## API Endpoints

### Auth
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Events
- GET /api/events - Get all events
- GET /api/events/:id - Get single event
- POST /api/events/:id/register - Register for event
- DELETE /api/events/:id/register - Cancel registration

### Registrations
- GET /api/registrations/my - Get my registered events

## Demo Credentials

- Email: test@gmail.com
- Password: 123456