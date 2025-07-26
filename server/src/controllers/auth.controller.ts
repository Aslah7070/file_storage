



import { Request, Response, NextFunction } from "express";
import { IAuthController } from "./interface/auth.interface";
import { IAuthService } from "../services/interfaces/IAuthService";
import { HttpStatus } from "../constants/status.constants";

export class AuthController implements IAuthController {
  constructor(private _authService: IAuthService) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
       
      const result = await this._authService.register(req.body);

            res.status(result.statuscode).json({success:result.success,message:result.message})

    } catch (error: any) {
      next(error);  
    }
  }
  async login(req:Request,res:Response,next:NextFunction):Promise<void>{
     try {
        const result=await this._authService.login(req.body)
     res.status(HttpStatus.OK).json({success:true,message:"login successfull",result})
     } catch (error) {
         next(error); 
        console.log(error);
        
     }
  }
}
