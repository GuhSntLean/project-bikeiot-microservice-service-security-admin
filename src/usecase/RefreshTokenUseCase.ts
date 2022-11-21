import { TokenProvider } from "../provider/TokenProvider";
import { refreshTokenRepository } from "../repository/RefreshTokenRepository";

class RefreshTokenUseCase {
  async generateRefreshToken(userId: string) {
    const existRefreshToken = refreshTokenRepository.find({
      where: { userId: { id: userId } },
    });

    if (existRefreshToken) {
      refreshTokenRepository.delete({ userId: { id: userId } });
    }
  }

  async verifyToken(refreshTokenId: string) {
    const existRefreshToken = await refreshTokenRepository.findOneBy({
      id: refreshTokenId,
    });

    if (!existRefreshToken) {
      return new Error("Not authorized");
    }

    const tokenProvider = new TokenProvider();
    const token = tokenProvider.execute(existRefreshToken.userId.id);

    return token;
  }
}

export { RefreshTokenUseCase };
