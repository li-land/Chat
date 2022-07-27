require("dotenv").config();
const { Server } = require("socket.io");
const UserModel = require("../user/user-model");
const UserDialogModel = require("../consolidated-models/user-dialog-model");
const socketService = require("./socket-service");

global.userId_socketId = [];

const createSocket = function (httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      allowedHeaders: ["Access-Control-Allow-Origin"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("client:chat_connected", async (userId) => {
      userId_socketId.push({ socketId: socket.id, userId });
      const user = await UserModel.findByPk(userId);
      if (!user.isOnline) {
        user.isOnline = true;
        await user.save();
      }
      socket.broadcast.emit("server:user_online", userId);
    });
    socket.on("client:typing_message", async (currentDialogData) => {
      const usersDialog = await UserDialogModel.findOne({
        where: { dialog_id: currentDialogData.dialogId },
      });
      const usersSocketId = socketService.getUsersSocketIdArray(
        usersDialog.user1_id,
        usersDialog.user2_id
      );
      usersSocketId.forEach((socketId) => {
        io.to(socketId).emit(
          "server:set_typing_bubble",
          currentDialogData.userId
        );
      });
    });
    socket.on("disconnect", async () => {
      const userId_socketIdItem = userId_socketId.find(
        (item) => item.socketId == socket.id
      );
      userId_socketId = userId_socketId.filter(
        (item) => item.socketId != socket.id
      );
      if (userId_socketIdItem) {
        const userId = userId_socketIdItem.userId;
        if (userId_socketId.findIndex((item) => item.userId == userId) == -1) {
          const user = await UserModel.findByPk(userId);
          if (user.isOnline) {
            user.isOnline = false;
            await user.save();
          }
          socket.broadcast.emit("server:user_offline", userId);
        }
      }
    });
  });
  return io;
};

module.exports = createSocket;
