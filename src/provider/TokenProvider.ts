import { sign } from "jsonwebtoken";

class TokenProvider {
  execute(userId: string, role: string) {
    const token = sign({role: role}, "7fb90d91-c44f-4123-b424-3f1852ba4687", {
      subject: userId,
      expiresIn: "1h",
    });
    return token;
  }
}

export { TokenProvider };
