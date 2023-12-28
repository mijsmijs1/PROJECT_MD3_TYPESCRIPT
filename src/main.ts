
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

//chay sever
const app = express();
app.use(express.json());

app.use(cors());
//API
import ApiRouter from './routes';
app.use('/api', ApiRouter)
//VIEW
import { viewPort } from './views';
app.use('/', viewPort)

app.listen(3000,()=>{
console.log(`Sever run at:${process.env.SV_HOST}:${process.env.SV_PORT}`);
    
})