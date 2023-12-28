import { productControlller } from "../../../controllers/product.controller";
import express from "express";

const Router = express.Router();

Router.get('/',productControlller.findMany)
Router.delete('/delete/:id',productControlller.delete)
export default Router;