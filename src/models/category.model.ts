import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const categoryModel = {
    findAll: async()=>{
        try{
            let categories = await prisma.categories.findMany()
            return {
                err:null,
                data:categories
            }
        }catch(err){
            console.log('err',err);
            return{
                err,
                data:null
            }
        }
        
    }
}