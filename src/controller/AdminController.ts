import { Request, Response } from "express";
import { AdminUseCase } from "../usecase/AdminUseCase";

class AdminController {
  async createUser(request: Request, response: Response) {
    try {
      const { username, email, password , role } = request.body;
      
      const userUseCase = new AdminUseCase();
      const result = await userUseCase.createUser(
        username,
        email,
        password,
        role
      );

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

export { AdminController };
