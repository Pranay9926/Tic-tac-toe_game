
const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

PORT = 3000;

app.use(cors());

const server = app.listen(PORT, () => {
  console.log("Server started at ", PORT);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("this socket id", socket.id);

  socket.on("join_room", (data) => {
    console.log("join room", data);

    // Join the specified room
    socket.join(data.room);
    console.log(`Socket ${socket.id} joined room ${data.room}`);
  });

    socket.on("send_info", (data) => {
      console.log("info", data);

      // Check if the socket is in the specified room before sending the message
      if (socket.rooms.has(data.room)) {
        socket.to(data.room).emit("receive_info", data);
      } else {
        console.log(`Socket ${socket.id} is not in room ${data.room}`);
      }
    });

    socket.on("send_message", (data) => {
      console.log("msg",data);

      // Check if the socket is in the specified room before sending the message
      if (socket.rooms.has(data.room)) {
        socket.to(data.room).emit("receive_message", data);
      } else {
        console.log(`Socket ${socket.id} is not in room ${data.room}`);
      }
    });

    socket.on("send_reset", (data) => {
      console.log("msg",data);

      // Check if the socket is in the specified room before sending the message
      if (socket.rooms.has(data.room)) {
        socket.to(data.room).emit("receive_reset", data);
      } else {
        console.log(`Socket ${socket.id} is not in room ${data.room}`);
      }
    });

    socket.on("gametie_send_reset", (data) => {
      console.log("msg", data);

      // Check if the socket is in the specified room before sending the message
      if (socket.rooms.has(data.room)) {
        socket.to(data.room).emit("gametie_receive_reset", data);
      } else {
        console.log(`Socket ${socket.id} is not in room ${data.room}`);
      }
    });


  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
