import { Server } from "socket.io";

export default (httpServer)=>{
  const io=new Server(httpServer, {
    cors:{
      origin:"https://silver-semolina-af2094.netlify.app"
    }
  })

  let users = [];

const addUser = (username, socketId) => {
  !users.some((user) => user.username === username) &&
    users.push({ username, socketId });
};
const findUser = (username) => {
  const user = users.find((user) => user.username === username);
  return user;
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log(`The socket with id ${socket.id} is connected`);
  socket.on("addUser", (username) => {
    addUser(username, socket.id);
  });

  socket.on("sendMessage", ({ recipientName, senderName }) => {
    const user = findUser(recipientName);
    io.to(user?.socketId).emit("getMessage", { senderName });
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

  return io;
}

