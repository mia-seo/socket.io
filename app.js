// 서버를 구동해주는 파일

const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");

const cors = require("cors");
const io = socketIO(server);

app.use(cors());
app.use(express.static(path.join(__dirname, "src")));
console.log(__dirname);

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    const { name, msg } = data;
    io.emit("chatting", {
      name,
      msg,
      time: moment(new Date()).format("h: mm A"),
    });
  });
});

server.listen(PORT, () => console.log(`server is running ${PORT}`));
