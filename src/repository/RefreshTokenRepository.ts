import { AppDataBase } from "../config/AppDataBase";
import { RefreshToken } from "../models/RefreshToken";

const refreshTokenRepository = AppDataBase.getRepository(RefreshToken);

export { refreshTokenRepository };