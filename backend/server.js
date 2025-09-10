const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { createClient } = require('redis');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",  // Allow frontend to connect
    methods: ["GET", "POST"]
  }
});

// Create Redis client
const redisClient = createClient({
  url: 'redis://redis:6379' // 'redis' is the Docker service name
});

redisClient.connect().catch(console.error);

redisClient.on('error', (err) => console.log('Redis Client Error', err));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for messages from frontend
  socket.on('send_message', async (data) => {
    try {
      // Store message in Redis
      await redisClient.rPush('messages', JSON.stringify(data));

      // Broadcast to all connected clients
      io.emit('receive_message', data);
    } catch (err) {
      console.error('Redis rPush error:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Optional test endpoint
app.get("/test", (req, res) => {
  res.send("Backend server is running!");
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
