import dayjs from "dayjs";
import { refreshTokenRepository } from "../repository/RefreshTokenRepository";
import { adminRepository } from "../repository/AdminRepository";

class RefreshTokenProvider {
  async execute(idUser: string) {
    const user = await adminRepository.findOneBy({ id: idUser });
    if (!user) {
      return new Error("Token not found");
    }

    try {
      const value = dayjs().add(15, "days").unix();

      const refreshToken = refreshTokenRepository.create({
        expireIn: value,
        userId: user,
      });

      await refreshTokenRepository.save(refreshToken);

      return refreshToken.id;
    } catch (error) {
      return new Error("Error generate refreshtoken");
    }
  }
}

export { RefreshTokenProvider };
