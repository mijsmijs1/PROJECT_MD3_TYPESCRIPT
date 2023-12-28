import jwt from 'jsonwebtoken';

export default {
    createToken: (data: any, time: any = 5 * 60 * 1000) => {
        return jwt.sign({...data}, String(process.env.JWT_KEY), { expiresIn: String(time) });
    },
    decodeToken: (token:string):any=>{
        try{
            return jwt.verify(token, String(process.env.JWT_KEY));
        }catch(err){
            return false
        }
    }
}