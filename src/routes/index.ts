import express from "express";
import version1 from './version_v1'
const Router = express.Router();

Router.use('/v1',version1)
 export default Router;