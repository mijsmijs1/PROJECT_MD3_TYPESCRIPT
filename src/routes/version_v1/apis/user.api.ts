import { userController } from "../../../controllers/user.controller";
import express from "express";
import { userMiddleWares } from "../../../middlewares";
const Router = express.Router();


Router.post('/register',userController.register)
Router.post("/login",userController.login)
Router.get('/confirm-email/:token',userController.confirmEmail)
Router.post('/decode-token/:token',userMiddleWares.tokenValidate,userController.decodeToken)
Router.get("/",userController.findMany)
export default Router;