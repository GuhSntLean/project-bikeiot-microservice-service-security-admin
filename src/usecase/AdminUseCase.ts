import { hash } from "bcrypt";
import { AdminProvider } from "../provider/AdminProvider";
import { adminRepository } from "../repository/AdminRepository";
import { InterfaceAdmin } from "../interfaces/InterfaceAdmin";
import { Admin , UserRole} from "../models/Admin";
import { RabbitmqServer } from "../server/RabbitmqServer";
class AdminUseCase {
  async createUser(
    userName: string,
    email: string,
    password: string,
    role: string
  ) {
    // Verificando se o usuario existe com E-MAIL e USUARIO
    const serverAmqp = new RabbitmqServer();

    console.log(role);

    const providerValidation = new AdminProvider();
    const existUserName = await adminRepository.findOneBy({
      userName: userName,
    });
    const existEmail = await adminRepository.findOneBy({ email: email });

    if (existUserName) {
      return new Error("User already exists or irreguar");
    }

    if (existEmail || !providerValidation.emailValidation(email)) {
      return new Error("Email already exists or irregular");
    }

    console.log(providerValidation.passwordValidation(password));
    if (!providerValidation.passwordValidation(password)) {
      return new Error("Password invalid format");
    }
    
    const roleType = providerValidation.roleValidation(role);

    try {
      const passwordHash = await hash(password, 8);

      const newUser = adminRepository.create({
        userName: userName,
        email: email,
        password: passwordHash,
        role: roleType,
      });

      await adminRepository.save(newUser);

      await serverAmqp.start();
      await serverAmqp.publishExchange("common.user", JSON.stringify(newUser));

      return newUser;
    } catch (error) {
      return new Error("Error save User");
    }
  }

  async updateUser(id: string, { userName, email }: InterfaceAdmin) {
    // TODO: validando com outro usuarios
    const user = await adminRepository.findOneBy({ id: id });

    if (Admin) {
      try {
        await adminRepository
          .createQueryBuilder()
          .update(Admin)
          .set({
            userName: userName || user.userName,
            email: email || user.email,
          })
          .where("id = id:", { id: id })
          .execute();
        return true;
      } catch (error) {
        console.log(`Error message: ${error}`);
        return false;
      }
    }
  }

  async getUser(id: string) {
    const user = await adminRepository.findOneBy({ id: id });

    if (!user) {
      return "false";
    }
    return user;
  }

  async getListUser() {
    const users = await adminRepository.find();

    return users;
  }
}

export { AdminUseCase };
