# Real-Time Chat Application

**Author:** [javairia-butt](https://github.com/javairia-butt) 
**Technologies Used:** React.js, Node.js, Socket.io, Redis, Docker, Docker Compose

## Overview

A real-time messaging web application built to demonstrate frontend-backend integration, containerized deployment using Docker, and real-time communication with Redis and Socket.io.

## Features

* Real-time messaging between multiple users
* Auto-scroll for messages
* Responsive and professional UI
* Dockerized deployment for easy setup

## Architecture / How It Works

```
Frontend (React) → Backend (Node.js + Socket.io) → Redis → All Connected Clients
```

* Users type messages on the frontend
* Messages sent to backend via Socket.io
* Backend stores messages in Redis and broadcasts to all connected clients
* Messages appear instantly on all browsers

## Installation / Run Locally

1. Start Docker containers:

   ```bash
   docker-compose up --build
   ```
2. Open the frontend:

   ```
   http://localhost:3000
   ```

## Key Learnings

* Real-time app development with Socket.io
* Docker containerization and deployment
* Using Redis as message queue / storage
* Frontend-backend integration

