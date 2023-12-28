import { userModel } from "../models/user.model"
import { Response, Request } from "express"
import { hashService, mailService, jwtService } from '../services'
import ejs from "ejs";
import path from "path";
import * as useragent from "useragent";
export const userController = {
    findMany: (req: Request, res: Response) => {
        try {
            let { err, data } = userModel.findAll()
            if (!err) {
                return res.status(200).json({
                    message: "success",
                    data,
                })
            }
            throw {
                message: "Loi gi do!"
            }
        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Loi may chu"
            })
        }
    },
    register: async (req: Request, res: Response) => {
        try {
            let ip: string = req.ip ? req.ip : "127.0.0.1"
            const userAgent = useragent.parse(req.headers["user-agent"]);
            const deviceInfo = `${userAgent.device}-${userAgent.os}-${userAgent.family}`;
            let { status, data, message } = await userModel.register({
                ...req.body,
                password: String(await hashService.hashPass(req.body?.password))
            }, ip, deviceInfo)
            if (!status) {
                throw {
                    message: message
                }
            }
            mailService.sendMail(req.body.email, "Email kich hoat tu PHUQUY",
                `<h1>Email kich hoat tu PHUQUY</h1>
                <p>chuc mung ban dang ki thanh cong, vui long nhan vao link phia duoi de dang ki</p>
                <a href="${process.env.HOST}/api/v1/users/confirm-email/${jwtService.createToken(data)}">Kich hoat tai khoan</a>
                `
            )
            return res.status(200).json({
                message,
                data
            })
        } catch (err: any) {
            console.log('check loi:', err);
            return res.status(500).json({ message: err.message || "Loi sever 2" })
        }
    },
    confirmEmail: async (req: Request, res: Response) => {
        try {
            let data = jwtService.decodeToken(req.params.token)
            if (!data) {
                throw {
                    message: "Ma kich hoat da het han roi!"
                }
            }
            let user = await userModel.update({ emailConfirm: true, updateAt: String(Date.now()) }, data.id)
            return res.status(200).send(
                await ejs.renderFile(path.join(__dirname, '../views/templates/confirmEmail.ejs'), {
                    link: "http://127.0.0.1:5173"
                }))
        } catch (err: any) {
            console.log('err', err);
            return res.status(500).json({
                message: err.message
                    || "Ma kich hoat het han",
            })

        }
    },
    login: async (req: Request, res: Response) => {
        try {
            let { data, status, message } = await userModel.login(req.body.loginId)
            console.log("da vao!", data, status);

            if (!status || !data) {
                throw {
                    message: "Nguoi dung khong ton tai!"
                }
            }
            if (data) {
                let result = await hashService.verifyPass(data.password,req.body.password)
                console.log('result', result);

                if (!result) {
                    throw {
                        message: "Sai mat khau!"
                    }
                }
                if (!data.status) {
                    throw {
                        message: "Tai khoan cua ban da bi khoa!"
                    }
                }
                if (req.body.loginId.includes('@') && data?.emailConfirm == false) {
                    mailService.sendMail(req.body.email, "Email kich hoat tu PHUQUY",
                        `<h1>Email kich hoat tu PHUQUY</h1>
                <p>chuc mung ban dang ki thanh cong, vui long nhan vao link phia duoi de dang ki</p>
                <a href="${process.env.HOST}/api/v1/users/confirm-email/${jwtService.createToken(data)}">Kich hoat tai khoan</a>
                `
                    )
                    throw {
                        message: "Email cua ban chua xac thuc nen khong the dang nhap bang email, chung toi da gui email xac thuc cho ban!"
                    }
                }
                return res.status(200).json({
                    message: "Ban da dang nhap thanh cong!",
                    token: jwtService.createToken(data,"1d")
                })
            }
        } catch (err: any) {
            console.log('err', err);
            return res.status(500).json({
                message: err.message || "Loi he thong dang nhap!"
            })
        }
    },
    decodeToken: async (req:Request,res:Response)=>{
        try{
            console.log('req.body',req.body);
            return res.status(200).json({
                message: "ok!",
                data: req.tokenData
            })
        }catch(err:any){
            console.log('err',err);
            
            return res.status(500).json(
                {
                    data: err.data || null
                }
            )
        }
    }
}
