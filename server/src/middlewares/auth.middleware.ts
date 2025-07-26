import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpResponse } from "../constants/response.constant";
import { HttpStatus } from "../constants/status.constants";
import {env} from "../configs/env.configs"

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
    type:string
}


const AuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token: string | undefined = req.cookies?.token;
        if (!token) {
            res.status(HttpStatus.FORBIDDEN).json({status:false,message:"Authentication token missing"})
            return             
        }
        const secretKey = env.JWT_ACCESS_SECRET;
        if (!secretKey) {   
            res.status(HttpStatus.NOT_FOUND).json({success:false,message:HttpResponse.UNEXPECTED_KEY_FOUND})
            return 
        }
          await jwt.verify(token, secretKey, (error, user) => {
            if (error) {
                res.status(HttpStatus.UNAUTHORIZED).json({success:false,message:HttpResponse.TOKEN_EXPIRED})
                return
              
            }    
            req.user = user as JwtDecoded;     
            next();
        });
    } catch (error) {
        res.status(400).json({status:false,message:"Internal server error"});
        return
    }
};
const userAuth=(req:Request,res:Response,next:NextFunction):void=>{

    AuthMiddleware(req,res,()=>{ 

        if(req.user &&req.user.type=='User'){
            console.log("req",req.user);
            
            return next()
        }else{
            console.log(req.user);
            console.log(req.user &&req.user.type=='User');
            res.status(HttpStatus.FORBIDDEN).json({success:false,message:HttpResponse.UNAUTHORIZED})
            return 
        }
    })
    
}
export { userAuth };