import dayjs from "dayjs";
import { refreshTokenRepository } from "../repository/RefreshTokenRepository";
import { userRepository } from "../repository/UserRepository";

class RefreshTokenProvider {
  async execute(idUser: string) {
    const user = await userRepository.findOneBy({ id: idUser });
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

      return refreshToken;
    } catch (error) {
      return new Error("Error generate refreshtoken");
    }
  }
}

export { RefreshTokenProvider };
