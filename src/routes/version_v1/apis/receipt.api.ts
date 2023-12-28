import express from 'express';
import { receiptController } from '../../../controllers/receipt.controller';
import { userMiddleWares } from "../../../middlewares";
const Route = express()
Route.post('/add-to-cart', userMiddleWares.tokenValidate, receiptController.addToCart)
export default Route;