import { productModel } from "../models/product.model";
import { Response, Request } from "express";

export const productControlller = {
    findMany: async (req:Request,res:Response)=>{
        try{
            let {err,data} = await productModel.findAll()
            if(err){
                throw {
                    message:'Sever bi loi',
                    err
                }
            } 
            return res.status(200).json({
                message: 'ok',
                data
            })
        }catch(err:any){
            return res.status(500).json({
                message:err.message && err.err || "sever bi loi 1"
            })
        }
    },
    delete:(req:Request, res:Response)=>{
        let id = Number(req.params.id)
        try{
            let {err,data} = productModel.delete(id);
            if(err){
                throw {
                    message:"bi loi roi",
                    err
                }
            }
            return res.status(200).json({
                message:'ok',
                data
            })
        }catch(err:any){
            return res.status(500).json({
                message:(err.message && err.err)|| "Toi bi loi roi"
            })
        }
    }
}