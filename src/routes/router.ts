import { Router } from "express";

import { AuthenticateAdminController } from "../controller/AuthenticateAdminController";
import { RefreshTokenController } from "../controller/RefreshTokenController";
import { AdminController } from "../controller/AdminController";

import AuthenticatedAdminMiddleware from "../middleware/AuthenticatedAdminMiddleware";

const authenticatedAdminMiddleware = new AuthenticatedAdminMiddleware();

const adminController = new AdminController();
const authenticate = new AuthenticateAdminController();
const refreshToken = new RefreshTokenController();

const routes = Router();

// Rotas não de autheticação
routes.post("/login", authenticate.authentication);
routes.post("/refresh-token", refreshToken.refreshToken);

// Rotas que precisa que o usuario esteja authenticado
routes.post(
  "/admin",
  authenticatedAdminMiddleware.ensureAuthenticated,
  adminController.createUser
);
routes.put(
  "/admin",
  authenticatedAdminMiddleware.ensureAuthenticated,
  adminController.updateAdmin
);
routes.post(
  "/get-admin",
  authenticatedAdminMiddleware.ensureAuthenticated,
  adminController.getAdmin
);
routes.post(
  "/list-admin",
  authenticatedAdminMiddleware.ensureAuthenticated,
  adminController.listAdmin
);

routes.put(
  "/update-password",
  authenticatedAdminMiddleware.ensureAuthenticated,
  adminController.changePassword
);

export default routes;
