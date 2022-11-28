import { Router } from "express";

import { AuthenticateAdminController } from "../controller/AuthenticateAdminController";
import { RefreshTokenController } from "../controller/RefreshTokenController";
import { AdminController } from "../controller/AdminController";

const adminController = new AdminController();
const authenticate = new AuthenticateAdminController();
const refreshToken = new RefreshTokenController();

const routes = Router();

routes.post("/login", authenticate.authentication);
routes.post("/register", adminController.createUser); // criando usuario
routes.post("/refresh-token", refreshToken.refreshToken);

// // Necessidade de login
// routes.get("/admin", userController.getUser); // pegando informações do usuario usuario

// routes.put('/update-admin', userController.updateUser);
// routes.put('/update-password-admin', userController.changePassword);

export default routes;
