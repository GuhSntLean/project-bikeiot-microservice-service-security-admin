import { compare } from "bcrypt";
import { userRepository } from "../repository/UserRepository";
import { InterfaceRequest } from "../interfaces/InterfaceRequest";

class AuthenticateUserUseCase {
  async authenticate({ login, password }: InterfaceRequest) {
    let user = null;

    user = await userRepository.findOneBy({
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

export { AuthenticateUserUseCase };
