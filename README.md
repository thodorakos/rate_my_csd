# Rate My CSD

Monorepo with Spring Boot backend, PostgreSQL, and Astro + React + Tailwind CSS frontend.

## Stack
- Backend: Spring Boot (Java 21 LTS)
- Database: PostgreSQL
- Frontend: Astro + React + Tailwind CSS
- Containerization: Docker + Docker Compose

## Run with Docker
- Build and start all services:
  - docker compose up --build
- Services:
  - Web App (Nginx): http://localhost:8023
  - Postgres: localhost:5432
  - (Backend and Frontend are accessible via Nginx)

## Run locally without Docker
### Backend
- From the backend folder:
  - mvn spring-boot:run

### Frontend
- From the frontend folder:
  - npm install
  - npm run dev

## API
- GET /api/hello

## Local credentials

Before starting Docker, copy `.env.example` to `.env` and set
`POSTGRES_PASSWORD` locally. Docker Compose passes the same value to the
database and backend. For direct Java execution, export
`SPRING_DATASOURCE_PASSWORD` instead.

If an existing database volume is in use, configure its existing password;
changing environment variables does not change the stored database password.
Never commit the filled-in environment file.
