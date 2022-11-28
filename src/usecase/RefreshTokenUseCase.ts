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
    const existRefreshToken = await refreshTokenRepository.findOne({
      where: {id: refreshTokenId},
      relations: {
        userId: true,
      },
    });

    if (!existRefreshToken) {
      return new Error("Not authorized");
    }

    // console.log(existRefreshToken)

    const tokenProvider = new TokenProvider();
    const token = tokenProvider.execute(existRefreshToken.userId.id, existRefreshToken.userId.role);

    console.log(token)

    return token;
  }
}

export { RefreshTokenUseCase };
