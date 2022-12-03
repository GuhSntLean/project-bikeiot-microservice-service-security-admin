import { validate } from "uuid";
import { TokenProvider } from "../provider/TokenProvider";
import { refreshTokenRepository } from "../repository/RefreshTokenRepository";

class RefreshTokenUseCase {
  async generateRefreshToken(userId: string) {
    const existRefreshToken = await refreshTokenRepository.find({
      where: { userId: { id: userId } },
    });

    if (existRefreshToken) {
      refreshTokenRepository.delete({ userId: { id: userId } });
    }
  }

  async verifyToken(refreshTokenId: string) {
    if (!validate(refreshTokenId)) {
      return new Error("Not authorized");
    }

    const existRefreshToken = await refreshTokenRepository.findOne({
      where: { id: refreshTokenId },
      relations: {
        userId: true,
      },
    });

    if (!existRefreshToken) {
      return new Error("Not authorized");
    }

    // console.log(existRefreshToken)
    try {
      const tokenProvider = new TokenProvider();
      const token = tokenProvider.execute(
        existRefreshToken.userId.id,
        existRefreshToken.userId.role
      );

      return token;
    } catch (error) {
      return new Error(error);
    }
  }
}

export { RefreshTokenUseCase };
