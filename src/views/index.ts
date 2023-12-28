import express from 'express';
import { HomePageController } from '../controllers/homepage.controller';
const router = express.Router();

router.use("/product",HomePageController.loadProductPage)


export const viewPort = router;