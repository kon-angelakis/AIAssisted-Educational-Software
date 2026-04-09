# StackTrek – AI-Assisted Educational Software

A full-stack AI-assisted learning platform for the Java programming language, built with **Spring Boot** (Java) and **React**.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Overview

StackTrek is an interactive, AI-powered learning platform designed to help users study Java. It combines curated learning content with dynamically generated quizzes to create a personalised and adaptive study experience. Users can select a difficulty level and topic, read lessons, and then test their knowledge through AI-generated multiple-choice and true/false questions. The platform tracks performance over time and uses that data to generate targeted revision sessions for weak areas.

---

## Features

- **User Authentication** – Register and log in with JWT-based session management and bcrypt password hashing.
- **Learning Mode** – Browse Java topics grouped by difficulty (Easy, Medium, Hard). Lessons are fetched and displayed via a web scraper.
- **Practice Mode** – Take AI-generated quizzes (10 questions per session) on a chosen Java topic and difficulty level.
- **Personalised Practice** – Receive quiz questions tailored to your identified weak areas, powered by an OpenAI assistant.
- **Revision Mode** – Revisit previously failed questions stored in your profile.
- **Performance Tracking** – Per-difficulty and per-topic stats including correct answers, mistakes, and tests taken, displayed with progress bars on your dashboard.

---

## Tech Stack

| Layer    | Technology                                                                        |
|----------|-----------------------------------------------------------------------------------|
| Frontend | React 19, Vite, React Router DOM, Axios, react-markdown, react-syntax-highlighter |
| Backend  | Spring Boot 3.4, Java 21, Spring Security, Spring AI (OpenAI), Spring WebFlux     |
| Database | MongoDB Atlas                                                                     |
| AI       | OpenAI Assistants API (via Spring AI)                                             |
| Auth     | JWT (Auth0 java-jwt), BCrypt (Spring Security Crypto)                             |
| Scraper  | Jsoup                                                                             |
| Other    | Lombok, Twilio, SendGrid                                                          |

---

## Project Structure

```
AIAssisted-Educational-Software/
├── backend/
│   └── stacktrek/                  # Spring Boot application
│       └── src/main/java/com/stacktrek/stacktrek/
│           ├── AI/                 # OpenAI assistant integration (question generation, weakness evaluation)
│           ├── Auth/               # Login, registration, JWT refresh
│           ├── Scraper/            # Jsoup-based lesson content scraper
│           ├── Security/           # JWT filter, CORS, hashing, dotenv config
│           └── Users/              # User model, repository, service, controller
│
└── frontend/
    └── src/
        ├── Auth/                   # Login and Register pages
        ├── Home/                   # Home/dashboard page
        ├── Category/
        │   ├── Difficulty/         # Difficulty selection page
        │   ├── Learning/           # Learning category and lesson pages
        │   └── Practice/           # Practice category and test pages
        └── Reusable/               # Shared components (Header, StatsCategory, Recommendation)
```

---

## Getting Started

### Prerequisites

- **Java 21+**
- **Maven 3.8+**
- **Node.js 18+** and **npm**
- A **MongoDB Atlas** cluster
- An **OpenAI API key**

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend/stacktrek
   ```

2. Create a `.env` file in `src/main/resources/` based on the provided example:

   ```bash
   cp src/main/resources/.env.example src/main/resources/.env
   ```

3. Fill in your credentials in `.env` (see [Environment Variables](#environment-variables)).

4. Run the application:

   ```bash
   ./mvnw spring-boot:run
   ```

   The backend starts on **port 1010** by default.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend is available at **http://localhost:5173** by default.

---

## Environment Variables

The backend reads the following values from `backend/stacktrek/src/main/resources/.env`:

| Variable         | Description                          |
|------------------|--------------------------------------|
| `MONGO_DB`       | MongoDB database name                |
| `MONGO_USER`     | MongoDB Atlas username               |
| `MONGO_PASSWORD` | MongoDB Atlas password               |
| `MONGO_CLUSTER`  | MongoDB Atlas cluster host           |
| `OPENAI_API_KEY` | OpenAI API key for the AI assistants |

---

## API Endpoints

### Auth (`/api/auth`)

| Method | Path              | Description                             |
|--------|-------------------|-----------------------------------------|
| POST   | `/login`          | Log in and receive a JWT               |
| POST   | `/register`       | Register a new user                    |
| GET    | `/authenticated`  | Check if the current token is valid    |
| POST   | `/update`         | Refresh the JWT with latest user stats |

### AI

| Method | Path                        | Description                                   |
|--------|-----------------------------|-----------------------------------------------|
| POST   | `/QuestionGiver`            | Generate AI quiz questions for a topic        |
| POST   | `/WeaknessEvaluator`        | Evaluate user weaknesses from test results    |
| POST   | `/PersonalisedQuestionGiver`| Generate personalised questions for weak areas|

### Scraper

| Method | Path      | Description                          |
|--------|-----------|--------------------------------------|
| POST   | `/scrape` | Scrape lesson content from a URL     |

### Users

| Method | Path      | Description                                    |
|--------|-----------|------------------------------------------------|
| POST   | `/submit` | Submit test results and update user stats      |

---

## License

This project is licensed under the terms of the [LICENSE](./LICENSE) file included in this repository.
