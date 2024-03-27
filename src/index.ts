import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomHandler } from "./room";

const port = 8000 || process.env.PORT;
const app = express();
app.use(cors);
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//get root and send hello
app.get("/", (req, res) => {
  res.send("Hello from server");
})


io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  roomHandler(socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
