import { app, httpServer } from "./app";
import os from "os";
import { AppDataBase } from "../config/AppDataBase";

const server = async () => {
  try {
    AppDataBase.initialize().then(() => {
      httpServer.listen(app.get("port"), () => {
        return console.info(
          `Server is running at port http://${os.hostname}:${app.get("port")}`
        );
      });
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

server();
