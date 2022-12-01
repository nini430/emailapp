import express from "express";
import cors from "cors";
import http from "http"
import userRouter from "./routes/users.js";
import messagesRouter from "./routes/messages.js";
import socket from "./socket.js";



const app = express();
const port=8000;
const server=http.createServer(app);
server.listen(process.env.PORT||port);
let io=socket(server);



app.use(express.json());
app.use(cors({origin:"https://silver-semolina-af2094.netlify.app"}));

app.use("/api/users", userRouter);
app.use("/api/messages", messagesRouter);





server.on("listening",()=>{
  console.log(`server is running at ${port}`)
})




