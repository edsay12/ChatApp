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
    this.server = http.createServer(this.app); // servir iniciado pelo http
    this.io = new Server(this.server, {
      cors: { origin: "http://localhost:5173" },
    }); // instancia do socket.io
  }
  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.routes();
  }
  public routes() {
    this.app.use("/", router);
  }
}
export default new App();
