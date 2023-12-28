import { NextFunction, Request, Response } from "express";
import { userModel } from "../../models/user.model";
import { jwtService } from "../../services";
declare global {
    namespace Express {
      interface Request {
        tokenData: any;
      }
    }
  }
export default {
    tokenValidate: async (req: Request, res: Response, next: NextFunction) => {
        try{

            let tokenData = await jwtService.decodeToken(req.params.token || String(req.headers.token));
            console.log('tokenData',tokenData);
            let {data} = await userModel.find(tokenData.userName)
            console.log(data);
            if(!tokenData){
                throw {
                    data: null
                }
            }
            if(!data){
                throw {
                    data: null
                }
            }
            if(tokenData.updateAt !=data.updateAt){
                throw {
                    data: null
                }
            }
            req.tokenData = data;
            next()
        }catch(err){
            return res.status(500).json({
                data: null
            })
        }
        
    }
}