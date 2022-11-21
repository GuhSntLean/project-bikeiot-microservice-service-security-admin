import { sign } from "jsonwebtoken";

class TokenProvider {
  execute(userId: string) {
    const token = sign({}, "7fb90d91-c44f-4123-b424-3f1852ba4687", {
      subject: userId,
      expiresIn: "100s",
    });
    return token;
  }
}

export { TokenProvider };
