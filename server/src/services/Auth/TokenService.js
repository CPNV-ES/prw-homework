import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwt.js";

export default class TokenService {
  generateToken(payload) {
    return jwt.sign(payload, jwtConfig.secret, jwtConfig.options);
  }

  verifyToken(token) {
    return jwt.verify(token, jwtConfig.secret);
  }
}
