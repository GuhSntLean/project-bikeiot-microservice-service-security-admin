import { Request, Response } from "express";
import { RefreshTokenUseCase } from "../usecase/RefreshTokenUseCase";

class RefreshTokenController {
  async refreshToken(request: Request, response: Response) {
    const refresh_token = request.body;

    if (refresh_token) {
      return new Error("Not authorized");
    }

    const refreshToken = new RefreshTokenUseCase();
    const token = refreshToken.verifyToken(refresh_token);

    return response.json(token);
  }
}

export { RefreshTokenController };
