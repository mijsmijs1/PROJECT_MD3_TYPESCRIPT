import bcrypt from 'bcrypt';
export default {
    hashPass: async (pass:string)=>{
        try{
            let password = await bcrypt.hash(pass, 10);
            return password;
        }catch(err){
            return err;
        }
    },
    verifyPass: async (hassedPass:string,pass:string)=>{
        try{
            let password = await bcrypt.compare(pass,hassedPass) 
            console.log('password',password);
            return password;
        }catch(err){
            console.log('err',err);
            return false;
        }
    }
}