import { Request, Response } from "express";
import { AuthenticateAdminUseCase } from "../usecase/AuthenticateAdminUseCase";
import { InterfaceRequest } from "../interfaces/InterfaceRequest";
import { TokenProvider } from "../provider/TokenProvider";
import { RefreshTokenProvider } from "../provider/RefreshTokenProvider";

class AuthenticateAdminController {
  async authentication(request: Request, response: Response) {
    const { username, password } = request.body;

    if (!username && !password) {
      return new Error("Error generate refreshtoken or token");
    }

    const intefaceLogin: InterfaceRequest = {
      login: username,
      password,
    };

    try {
      const authenticateUserUseCase = new AuthenticateAdminUseCase();
      const user = await authenticateUserUseCase.authenticate(
        intefaceLogin
      );

      if (user instanceof Error) {
        return response.status(400).json({error: user.message});
      }

      //  Gerando um tokem para o usuario
      const tokenProvider = new TokenProvider();
      const token = tokenProvider.execute(user.id, user.role);

      // Gerando um refreshtoken
      const refreshTokenProvider = new RefreshTokenProvider();
      const refreshToken = await refreshTokenProvider.execute(user.id);

      return response.json({ token, refreshToken});
    } catch (error) {
      return new Error("Error generate refreshtoken or token");
    }
  }
}

export { AuthenticateAdminController };
