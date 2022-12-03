import { hash, compare } from "bcrypt";
import { AdminProvider } from "../provider/AdminProvider";
import { adminRepository } from "../repository/AdminRepository";
import { Admin } from "../models/Admin";
import { RabbitmqServer } from "../server/RabbitmqServer";
import { InterfaceResponseAdmin } from "../interfaces/InterfaceAdmin";
import { validate as uuid } from "uuid";

class AdminUseCase {
  async createAdmin(
    userName: string,
    email: string,
    password: string,
    role: string
  ) {
    // Verificando se o usuario existe com E-MAIL e USUARIO
    const serverAmqp = new RabbitmqServer();
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

    if (!providerValidation.passwordValidation(password)) {
      return new Error("Password invalid format");
    }

    const roleType = providerValidation.roleValidation(role);
    if (!roleType) {
      return new Error("Invalid TypeRole");
    }

    try {
      const passwordHash = await hash(password, 8);

      const newUser = adminRepository.create({
        userName: userName,
        email: email,
        password: passwordHash,
        role: roleType,
      });

      const result = await adminRepository.save(newUser);

      const returnResult: InterfaceResponseAdmin = {
        id: result.id,
        username: result.userName,
        email: result.email,
        role: result.role,
      };

      await serverAmqp.start();
      await serverAmqp.publishExchange(
        "admin.user",
        JSON.stringify(returnResult)
      );

      return returnResult;
    } catch (error) {
      return new Error("Error save User");
    }
  }

  async updateAdmin(id: string, userName: string, email: string, role: string) {
    // TODO: validando com outro usuarios
    const serverAmqp = new RabbitmqServer();
    const providerValidation = new AdminProvider();

    if (!uuid(id)) {
      return new Error("User not found");
    }

    const user = await adminRepository.findOneBy({ id: id });
    if (!user) {
      return new Error("User not found");
    }

    const validateUsername = await adminRepository.findOneBy({
      userName: userName,
    });
    const validateEmail = await adminRepository.findOneBy({ email: email });

    if (validateUsername && validateUsername.id != id) {
      return new Error("Username is being used or is invalid");
    }

    console.log(providerValidation.emailValidation(email));
    if (
      (validateEmail && validateEmail.id != id) ||
      !providerValidation.emailValidation(email)
    ) {
      return new Error("Email is being used or is invalid");
    }

    const roleType = providerValidation.roleValidation(role);
    if (!roleType) {
      return new Error("Invalid TypeRole");
    }

    try {
      const result = await adminRepository
        .createQueryBuilder()
        .update(Admin)
        .set({
          userName: userName || user.userName,
          email: email || user.email,
          role: roleType,
        })
        .where("id = :id", { id: id })
        .execute();

      if (result.affected != 1) {
        return new Error("Error when updating");
      }

      const updateResult = await adminRepository.findOneBy({ id: id });

      const returnResult: InterfaceResponseAdmin = {
        id: updateResult.id,
        username: updateResult.userName,
        email: updateResult.email,
        role: updateResult.role,
      };

      await serverAmqp.start();
      await serverAmqp.publishExchange(
        "admin.user",
        JSON.stringify(returnResult)
      );

      return returnResult;
    } catch (error) {
      console.log(`Error message: ${error}`);
      return new Error("Error when update");
    }
  }

  async updatePassword(id: string, oldpassword: string, newpassword: string) {
    const providerValidation = new AdminProvider();

    if (!uuid(id)) {
      return new Error("User not found");
    }

    const user = await adminRepository.findOneBy({ id: id });
    if (!user) {
      return new Error("User not found");
    }

    const passwordPass = await compare(oldpassword, user.password);
    if (!passwordPass) {
      return new Error("Password is invalid");
    }

    if (
      oldpassword == newpassword ||
      !providerValidation.passwordValidation(newpassword)
    ) {
      return new Error("Password is invalid");
    }

    try {
      const newPassoworsdCrypt = await hash(newpassword, 8);

      const result = await adminRepository
        .createQueryBuilder()
        .update(Admin)
        .set({
          password: newPassoworsdCrypt || user.password,
        })
        .where("id = :id", { id: id })
        .execute();

      if (result.affected != 1) {
        return new Error("Error when updating");
      }

      const update = await adminRepository.findOneBy({ id: id });

      const resultUpdate = {
        id: update.id,
        update: true,
      };

      return resultUpdate;
    } catch (error) {
      return new Error("Update error");
    }
  }

  async getUser(iduser: string) {
    if (!uuid(iduser)) {
      return new Error("User not found");
    }

    try {
      const user = await adminRepository.findOneBy({ id: iduser });

      if (!user) {
        return new Error("User not found");
      }

      const returnUser = {
        id: user.id,
        username: user.userName,
        email: user.email,
        role: user.role
      };

      return returnUser;
    } catch (error) {
      return new Error("Find error");
    }
  }
  async getListAdmin() {
    // const users = await adminRepository.find();
    try {
      const users = await adminRepository
        .createQueryBuilder("user")
        .select("user.id, user.user_name as username, user.role, user.email")
        .getRawMany();

      return users;
    } catch (error) {
      return new Error("Find Error");
    }
  }
}

export { AdminUseCase };
