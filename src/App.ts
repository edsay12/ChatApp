import express from "express";
import { router } from "./routes/router";



class App {
  public server: express.Application;
  constructor() {
    this.server = express();
    this.middlewares();
  }
  private middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.routes();
  }
  public routes() {
    this.server.use("/", router);
  }
}
export default new App();
