let ioInstance;

function initSocket(server) {
  const { Server } = require("socket.io");
  ioInstance = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true
    }
  });

  ioInstance.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);
    socket.emit("test", "test is passed ✅");
  });
  return ioInstance;
}

function getIo() {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized");
  }
  return ioInstance;
}

module.exports = { initSocket, getIo };
