import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpResponse } from "../constants/response.constant";
import { HttpStatus } from "../constants/status.constants";
import { env } from "../configs/env.configs";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtDecoded;
    token?: string;
  }
}

export interface JwtDecoded extends JwtPayload {
  id: string;
  username: string;
  email: string;
  isBlocked: boolean;
  type: string;
}

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string | undefined = req.cookies?.token;
console.log(" token",token);
    if (!token) {
      const refreshToken = req.cookies?.refreshmentToken;
      console.log("refresh token",refreshToken);
      

      if (!refreshToken) {
        res.status(HttpStatus.NOT_FOUND).json({success:false,message:HttpResponse.NO_TOKEN})
        return
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET as string
      ) as JwtDecoded;
      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email, role: decoded.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1m" }
      );
      res.cookie("accessToken", newToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1 * 60 * 1000,
        sameSite: "none",
      });

      req.user = decoded;
      return next();
    }
    const secretKey = env.JWT_ACCESS_SECRET;
    if (!secretKey) {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ success: false, message: HttpResponse.UNEXPECTED_KEY_FOUND });
      return;
    }
    await jwt.verify(token, secretKey, (error, user) => {
      if (error) {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
          res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ success: false, message: HttpResponse.TOKEN_EXPIRED });
          return;
        }

        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_SECRET as string
        ) as JwtDecoded;
        const newToken = jwt.sign(
          { id: decoded.id, email: decoded.email, role: decoded.role },
          process.env.JWT_SECRET as string
        );
        res.cookie("accessToken", newToken, {
          httpOnly: true,
          secure: true,
          maxAge: 1 * 60 * 1000,
          sameSite: "none",
        });

        req.user = decoded;
        return next();
      }
      req.user = user as JwtDecoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Internallll server error" });
    return;
  }
};
const userAuth = (req: Request, res: Response, next: NextFunction): void => {
  AuthMiddleware(req, res, () => {
    if (req.user) {
     
      return next();
    } else {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ success: false, message: HttpResponse.UNAUTHORIZED });
      return;
    }
  });
};
export { userAuth };
