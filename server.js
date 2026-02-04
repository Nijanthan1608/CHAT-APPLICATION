const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static("public"));

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Receive message from client
  socket.on("chatMessage", (msg) => {
    // Broadcast to all users
    io.emit("chatMessage", {
      id: socket.id,
      message: msg
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
