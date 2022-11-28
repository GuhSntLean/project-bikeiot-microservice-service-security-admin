import { Router } from "express";

import { AuthenticateAdminController } from "../controller/AuthenticateAdminController";
import { RefreshTokenController } from "../controller/RefreshTokenController";
import { AdminController } from "../controller/AdminController";

const adminController = new AdminController();
const authenticate = new AuthenticateAdminController();
const refreshToken = new RefreshTokenController();

const routes = Router();

routes.post("/login", authenticate.authentication);
routes.post("/refresh-token", refreshToken.refreshToken);

routes.post("/admin", adminController.createUser);
routes.put("/admin", adminController.updateAdmin);
routes.get("/admin", adminController.getAdmin);
routes.get("/list-admin", adminController.listAdmin);

routes.put("/update-password", adminController.changePassword);

export default routes;
