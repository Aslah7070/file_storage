



import { Request, Response, NextFunction } from "express";
import { IAuthController } from "./interface/auth.interface";
import { IAuthService } from "@/services/interfaces/IAuthService";

export class AuthController implements IAuthController {
  constructor(private _authService: IAuthService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._authService.register(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      next(error); 
    }
  }
}
