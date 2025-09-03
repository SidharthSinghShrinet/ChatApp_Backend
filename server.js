import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

// ✅ Allowed frontend domains
const allowedOrigins = [
  "https://chat-app-frontend-lovat-six.vercel.app",
  "https://chat-app-frontend-git-main-sidharthsinghshrinets-projects.vercel.app",
  "https://chat-app-frontend-4swvt1qo0-sidharthsinghshrinets-projects.vercel.app",
  "http://localhost:5173"
];

// ✅ Express CORS
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ✅ Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// ✅ Socket.IO connection
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
