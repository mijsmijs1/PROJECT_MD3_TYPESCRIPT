import { categoryModel } from "../models/category.model";
import { Response, Request } from "express";

export const categoryController = {
    findMany: async (req:Request,res:Response)=>{
        try{
            let {err,data} = await categoryModel.findAll()
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
    }}