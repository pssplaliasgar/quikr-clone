# Quikr Clone

A full-stack classified ads marketplace platform built with NestJS and React.

## Project Structure

```
quikr-clone/
├── backend/          # NestJS backend API
├── frontend/         # React frontend application
└── .kiro/           # Kiro specs and configuration
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Setup Instructions

### Database Setup

1. Install PostgreSQL if not already installed
2. Create a new database:
```sql
CREATE DATABASE quikr_clone;
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file and configure:
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials

5. Start the development server:
```bash
npm run start:dev
```

The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Technology Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **HTTP Client**: Axios

## Features

- User authentication and authorization
- Three-level category hierarchy
- Ad creation and management with image uploads
- Location-based filtering
- Advanced search with filters
- Responsive design
- RESTful API

## Development

### Backend Commands
```bash
npm run start:dev    # Start development server
npm run build        # Build for production
npm run start:prod   # Start production server
npm run test         # Run tests
```

### Frontend Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Environment Variables

### Backend (.env)
- `DATABASE_HOST` - PostgreSQL host
- `DATABASE_PORT` - PostgreSQL port
- `DATABASE_USER` - Database username
- `DATABASE_PASSWORD` - Database password
- `DATABASE_NAME` - Database name
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - Token expiration time
- `PORT` - Server port
- `CORS_ORIGIN` - Allowed CORS origin

### Frontend (.env)
- `VITE_API_BASE_URL` - Backend API URL

## License

MIT
