const MessageDB = require("../models/message");
const UnReadDB = require("../models/unread");
const helper = require("./helper");

let liveUser = async (socketId, user) => {
  user["socketId"] = socketId;
  helper.set(socketId, user._id);
  helper.set(user._id, user);
};

let initialize = async (io, socket) => {
  socket["currentUserId"] = socket.userData._id;
  await liveUser(socket.id, socket.userData);
  socket.on("message", (data) => incomingMessage(io, socket, data));
  socket.on("unreads", (data) => loadUnReadMsg(socket));
};

let loadUnReadMsg = async (socket) => {
  let unreads = await UnReadDB().find({ to: socket.currentUserId });
  if (unreads.length > 0) {
    unreads.forEach(async (unread) => {
      await UnReadDB.findByIdAndDelete(unread._id);
    });
  }
  socket.emit("unreads", { msg: unreads.length });
};

let incomingMessage = async (io, socket, data) => {
  const saveMsg = await new MessageDB(data).save();
  const msgResult = await MessageDB.findById(saveMsg._id).populate(
    "from to",
    "name _id"
  );
  const toUser = await helper.get(msgResult.to._id);

  if (toUser) {
    let toSocket = io.of("/chat").to(toUser.socketId);
    if (toSocket) {
      toSocket.emit("message", msgResult);
    } else {
      next(new Error("to Socket not found"));
    }
  } else {
    await new UnReadDB({
      from: msgResult.from._id,
      to: msgResult.to._id,
    }).save();
  }

  socket.emit("message", msgResult);
};

module.exports = {
  initialize,
};
