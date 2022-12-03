import { Request, Response } from "express";
import { AdminUseCase } from "../usecase/AdminUseCase";

class AdminController {
  async createUser(request: Request, response: Response) {
    try {
      const { username, email, password, role } = request.body;

      if (!username || !email || !password || !role) {
        return response.status(500).json({ error: "Field is missing" });
      }

      const userAdminCase = new AdminUseCase();
      const result = await userAdminCase.createAdmin(
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

  async updateAdmin(request: Request, response: Response) {
    try {
      const { id, username, email, role } = request.body;

      if (!id || !email || !username || !role) {
        return response.status(500).json({ error: "Field is missing" });
      }

      const adminUseCase = new AdminUseCase();
      const result = await adminUseCase.updateAdmin(id, username, email , role);

      if (result instanceof Error) {
        return response.status(400).json({error: result.message});
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({error: error.message});
    }
  }

  async changePassword(request: Request, response: Response) {
    try {
      const { id, oldpassword, newpassword } = request.body;

      if (!id || !oldpassword || !newpassword) {
        return response.status(400).json({ error: "Field is missing" });
      }

      const adminUseCase = new AdminUseCase();
      const result = await adminUseCase.updatePassword(
        id,
        oldpassword,
        newpassword
      );

      if (result instanceof Error) {
        return response.status(400).json({error: result.message});
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({error: error});
    }
  }

  async getAdmin(request: Request, response: Response) {
    try {
      const { id } = request.body;

      if (!id) {
        return response.status(400).json({ error: "Field is missing" });
      }

      const adminUseCase = new AdminUseCase();
      const result = await adminUseCase.getUser(id);

      if (result instanceof Error) {
        return response.status(400).json({error: result.message});
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({error: error.message});
    }
  }

  async listAdmin(request: Request, response: Response) {
    try {
     
      const adminUseCase = new AdminUseCase();
      const result = await adminUseCase.getListAdmin();

      if (result instanceof Error) {
        return response.status(400).json({error: result.message});
      }

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({error: error.message});
    }
  }


}

export { AdminController };
