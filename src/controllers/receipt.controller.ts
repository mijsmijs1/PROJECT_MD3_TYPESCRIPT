import { Request, Response } from "express"
import { receiptModel } from "../models/receipt.model"
interface CustomRequest extends Request {
    tokenData: any; // Định nghĩa kiểu của 'tokenData' tại đây
  }
export const receiptController =  {
    addToCart: async (req: CustomRequest, res: Response) => {
        // console.log('req.tokenData',req.tokenData);
         await receiptModel.addToCart(req.body,Number(req.tokenData.id))
        // console.log('result',result);
        
    }
}