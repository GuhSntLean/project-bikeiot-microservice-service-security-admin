import { AppDataBase } from "../config/AppDataBase";
import { Admin } from "../models/Admin";

const adminRepository = AppDataBase.getRepository(Admin);

export { adminRepository };
