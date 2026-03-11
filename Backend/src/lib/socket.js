import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

// store online users
const userSocketMap = {}; // { userId: socketId }

// function to get receiver socket id
export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

// apply authentication middleware
io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  const userId = socket.userId;

  if (!userId) {
    console.log("Connection rejected: userId missing");
    socket.disconnect();
    return;
  }

  console.log("User connected:", socket.user.fullName);

  // store socket id
  userSocketMap[userId] = socket.id;

  // send online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.user.fullName);

    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };