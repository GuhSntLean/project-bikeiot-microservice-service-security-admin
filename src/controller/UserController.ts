import { Request, Response } from "express";
import { UserUseCase } from "../usecase/UserUseCase";

class UserController {
  async createUser(request: Request, response: Response) {
    try {
      const { userName, email, password } = request.body;
      const userUseCase = new UserUseCase();
      const result = await userUseCase.createUser({
        userName,
        email,
        password,
      });

      if (result instanceof Error) {
        return response.status(400).json(result.message);
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }

  async updateUser(request: Request, response: Response) {
    try {
      const infoUser = request.body;
      

    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }

}

export { UserController };
