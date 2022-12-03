import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

class AuthenticatedAdminMiddleware {
  ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const authToken = request.headers.authorization;

    if (!authToken) {
      return response.status(401).json({
        message: "Token is missiong",
      });
    }

    const [, token] = authToken.split(" ");
    try {
      const verifyUser = verify(token, "7fb90d91-c44f-4123-b424-3f1852ba4687");
      if(!verifyUser.sub){
        return response.status(401).json({
          message: "Token is missiong",
        });
      }
    } catch (error) {
      return response.status(401).json({
        message: "Invalid token",
      });
    }
    next();
  }
}

export default AuthenticatedAdminMiddleware;
