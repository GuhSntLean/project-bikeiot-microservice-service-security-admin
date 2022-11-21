import { AppDataBase } from "../config/AppDataBase";
import { User } from "../models/User";

const userRepository = AppDataBase.getRepository(User);

export { userRepository };
