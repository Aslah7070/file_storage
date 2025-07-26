import { Request, Response, NextFunction } from "express";
import { IAuthController } from "./interface/auth.interface";
import { IAuthService } from "../services/interfaces/IAuthService";

export class AuthController implements IAuthController {
  constructor(private _authService: IAuthService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._authService.register(req.body);
      if (result.success) {
        const token = result.token;
        const refreshToken = result.refreshToken;
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: "none",
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          : "none",
        });
      }

      res.status(result.statuscode).json({
        success: result.success,
        message: result.message,
        user: result.user,
        token: result.token,
        refreshtoken: result.refreshToken,
      });
    } catch (error: any) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._authService.login(req.body);
      if (result.success) {
        const token = result.token;
        const refreshToken = result.refreshToken;
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: "none",
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
          sameSite: "none",
        });
      }
      res
        .status(result.statuscode)
        .json({ success: result.success, message: result.message, result });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?._id;
      const result = await this._authService.logout(userId);

      res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // true in prod
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      res
        .status(result.statuscode)
        .json({ suceess: result.success, message: result.message, result });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}
