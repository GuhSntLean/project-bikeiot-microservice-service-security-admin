import { Request, Response } from "express";
import { RefreshTokenUseCase } from "../usecase/RefreshTokenUseCase";

class RefreshTokenController {
  async refreshToken(request: Request, response: Response) {
    const { refresh_token } = request.body;

    if (!refresh_token) {
      return response.status(400).json({error: "Not authorized"});
    }

    const refreshToken = new RefreshTokenUseCase();
    const token = await refreshToken.verifyToken(refresh_token);

    if (token instanceof Error) {
      return response.status(400).json({error: token.message});
    }

    return response.status(201).json({ token: token });
  }
}

export { RefreshTokenController };
