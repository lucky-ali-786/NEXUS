# 🚀 NEXUS: Asynchronous Content Platform

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

**NEXUS** is an enterprise-grade, asynchronous Content Management System (CMS) engineered to handle high traffic and compute-heavy tasks without compromising performance. Moving beyond standard CRUD architecture, this system leverages distributed task queues, in-memory caching, and robust monitoring to deliver a non-blocking, highly responsive user experience.

## 🔗 Live Demo
* **Frontend Application:** [https://scalable-cms-deployed.vercel.app](https://scalable-cms-deployed.vercel.app)
* **Backend API:** [https://scalable-cms-api.onrender.com](https://scalable-cms-api.onrender.com)
* **API Documentation (Swagger):** [https://scalable-cms-api.onrender.com/api-docs](https://scalable-cms-api.onrender.com/api-docs)

---

## ✨ System Architecture & Key Features

### 🛡️ Security & Identity Management
* **Stateless Authentication:** Secure OAuth 2.0 flow via Google, utilizing JSON Web Tokens (JWTs) stored in `HttpOnly` cookies to eliminate client-side token theft and mitigate CSRF vulnerabilities.
* **Bot Mitigation & Resource Protection:** Integrated **Cloudflare Turnstile** across authentication and submission endpoints to thwart brute-force attacks and automated botnets, preserving backend compute resources while maintaining a frictionless user experience.
* **Redis-Backed OTP:** Optimized, auto-expiring verification flows using Redis keys with precise Time-To-Live (TTL), entirely bypassing slower relational database writes.
* **Input Sanitization:** Rigorous sanitization of user-generated content via `DOMPurify` to neutralize Cross-Site Scripting (XSS) attack vectors before database persistence.
* **Algorithmic Traffic Control:** Custom Redis-based rate limiting to safeguard API stability, prevent abuse, and gracefully manage high-velocity traffic spikes.

### ⚡ Concurrency & Asynchronous Processing (BullMQ)
* **Decoupled Producer-Consumer Logic:** Heavy computational tasks (e.g., email dispatch, media processing) are offloaded from the Node.js main thread to background workers using **BullMQ**, guaranteeing non-blocking I/O.
* **Fault Tolerance:** Critical background workers are configured with Exponential Backoff strategies to automatically retry and resolve transient network or third-party API failures.
* **Load Management:** Redis message queues act as a reliable buffer during traffic surges, throttling task execution to prevent systemic backend overload.

### 🔌 Data Engineering & Observability
* **Database Optimization:** Complex **MongoDB Aggregation Pipelines** push heavy data processing, analysis, and reporting directly to the database layer for maximum efficiency.
* **AI Integration:** Seamless integration with the **Gemini API** to provide dynamic, automated content generation and writing assistance directly within the editor.
* **System Monitoring:** Comprehensive application and database tracking utilizing **Redis Cloud / Uptime Monitoring** to track queue health, latency, hits/misses, and guarantee 24/7 continuous service availability without cold starts.

---

## 🛠️ Technology Stack
* **Backend:** Node.js, Express.js
* **Frontend:** React.js, Tailwind CSS, Vite, shadcn/ui
* **Database:** MongoDB, Mongoose
* **Caching & Message Broker:** Redis
* **Task Queues:** BullMQ
* **API Documentation:** Swagger UI
* **Queue & System Monitoring:** Bull Board, Redis Cloud, UptimeRobot

---

## 🚀 Future Roadmap
As the platform scales, the following technical enhancements are planned for upcoming iterations:

* **Real-Time Bidirectional Communication:** Integrating **Socket.io** to enable live user notifications, real-time analytics dashboards, and collaborative content editing.
* **Advanced DevOps & Orchestration:** Transitioning from basic containerization to enterprise orchestration using **Kubernetes (K8s)** and migrating the infrastructure to **AWS** for multi-region availability and auto-scaling.
* **Serverless Edge Computing:** Offloading lightweight, high-frequency API endpoints to serverless environments (Edge Functions) to drastically reduce latency and computational overhead.
* **Automated CI/CD & Testing:** Implementing a robust testing suite utilizing **Jest** for unit testing, integrated directly into a **GitHub Actions** CI/CD pipeline for zero-downtime, automated deployments.

---

## 💻 Local Development (Standard Setup)

Follow these steps to run the application locally on your machine without Docker.

### 1. Prerequisites
Ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (v18 or higher)
* [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URI)
* [Redis](https://redis.io/) (Local instance or Redis Cloud URI)

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with your required environment variables (refer to the Docker section below for the required keys).

Start the main API server:
```bash
npm run dev
```

In a new terminal window, start the BullMQ background worker to process background jobs (like emails and content processing):
```bash
cd backend
node src/bullmq/worker.js
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory and define your backend API URL (e.g., `VITE_API_URL=http://localhost:8000`).

Start the Vite development server:
```bash
npm run dev
```

---

## 🐳 Full-Stack Deployment (Docker Hub Edition)

This application is fully containerized. Both the backend API and the Vite + React frontend are available as pre-built Docker images. You can pull and run the entire stack locally with a single command.

### 1. Setup Environment Variables

Create a `.env` file in your root folder with the following keys:

```env
PORT=8000
MONGO_URL=your_mongodb_atlas_url
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
ADMIN_EMAIL=admin@example.com
BREVO_API_KEY=your_brevo_api_key
```

### 2. Run the Full Stack with Docker Compose
The easiest way to run both the frontend and backend simultaneously is using Docker Compose. Create a `docker-compose.yml` file in the same folder as your `.env` file:

```yaml
version: '3.8'

services:
  backend:
    image: lucky894/backend-service-cms:v1
    container_name: cms_backend
    ports:
      - "8000:8000"
    env_file:
      - .env
    restart: always

  frontend:
    image: lucky894/frontend-service-cms:v1 
    container_name: cms_frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    restart: always
```

### 3. Start the Application
Open your terminal in that folder and run:

```bash
docker-compose up -d
```

**Access the Application:**
* **Frontend:** Open `http://localhost:5173` in your browser.
* **Backend API:** Running locally on `http://localhost:8000`.

To stop the application, run:
```bash
docker-compose down
```
