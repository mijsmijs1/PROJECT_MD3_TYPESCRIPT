import { readFileSync,writeFileSync } from "fs";
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()
export const productModel = {
    findAll: async()=>{
        try{
            let products = await prisma.products.findMany()
            return {
                err:null,
                data:products
            }
        }catch(err){
            console.log('err',err);
            
            return{
                err,
                data:null
            }
        }
        
    },
    delete:(id:number)=>{
        try{
            let products = JSON.parse(readFileSync('products.json','utf-8'))
            let result = products.filter((item: { id: number; }) => item.id !== id)
            writeFileSync('products.json',JSON.stringify(result))
            return {
                err:null,
                data:result
            }
        }catch(err){
            return{
                err,
                data:null
            }
        }
       
    }
}