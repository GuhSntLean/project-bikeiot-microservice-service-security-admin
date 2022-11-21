import { Router } from "express";

import { AuthenticateUserController } from "../controller/AuthenticateUserController";
import { RefreshTokenController } from "../controller/RefreshTokenController";
import { UserController } from "../controller/UserController";

const userController = new UserController();
const authenticate = new AuthenticateUserController();
const refreshToken = new RefreshTokenController();

const routes = Router();

// Sem necessidade de login
routes.post("/login", authenticate.authentication);
routes.post("/register", userController.createUser); // criando usuario
routes.post("/refresh-token", refreshToken.refreshToken);

// Necessidade de login
routes.get("/user"); // pegando informações do usuario usuario
routes.post("/user"); // modificando usuario (username, email)
routes.put("/user"); // modificando usuario (username, email)

routes.post("/change-password"); // modificando password do usuario
routes.post("/forgot-password"); // caso tenha esquecido a senha

export default routes;
