import { auth } from "express-oauth2-jwt-bearer";
import { asyncHandler } from "../utils/asyncHandler";
import Jwt from "jsonwebtoken";
import User from "../models/users.model";

declare global {
  namespace Express {
    interface Request {
      auth0Id: string;
      userId: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authorization.split(" ")[1];
  const decoded = Jwt.decode(token) as Jwt.JwtPayload;
  const auth0Id = decoded.sub;
  const user = await User.findOne({ auth0Id });
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.auth0Id = auth0Id as string;
  req.userId = user._id.toString();
  next();
});
