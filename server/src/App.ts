import express from "express";
import { router } from "./routes/router";
import * as http from "http";
import { Server } from "socket.io";

class App {
  public app: express.Application;
  public server: http.Server;
  public io: Server;
  constructor() {
    this.app = express(); // express rotas etc.
    this.middlewares();
  }
  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.routes();
  }
  public routes() {
    this.app.use("/", router);

    this.server = http.createServer(this.app); // servir iniciado pelo http
    this.io = new Server(this.server, {
      cors: { origin: "http://localhost:5173" },
    }); // instancia do socket.io

    this.io.on("connection", (socket) => {
      console.log("hi", socket.id);

      socket.on("disconnect", (reason) => {
        console.log("usuario desconectado");
      });

      socket.on("setUserName", (username) => {
        socket.data.username = username;
        console.log(socket.data);
      });
      socket.on("message", (message) => {
        console.log(message)
        this.io.emit("receive_message", {
          message,
          author: socket.data.username,
          authorId: socket.id,
        });
      });
    });
  }
}
export default new App();
