import { compare } from "bcrypt";
import { adminRepository } from "../repository/AdminRepository";
import { InterfaceRequest } from "../interfaces/InterfaceRequest";

class AuthenticateAdminUseCase {
  async authenticate({ login, password }: InterfaceRequest) {
    let user = null;

    user = await adminRepository.findOneBy({
      userName: login,
    });

    if (!user) {
      return new Error("Login or password invalid");
    }

    // Verificando se o password é igual
    const passwordPass = await compare(password, user.password);
    if (!passwordPass) {
      return new Error("Login or password invalid");
    }

    let idUser = null;

    if (user.id) {
      idUser = user.id;
      return idUser;
    }

    return null;
  }
}

export { AuthenticateAdminUseCase };
