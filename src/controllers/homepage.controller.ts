import { readFileSync } from "fs";
import { Request, Response } from 'express'
import path from "path";
import ejs from "ejs";
export const HomePageController = {
    loadProductPage: async (req: Request, res: Response) => {
        let products = JSON.parse(readFileSync("products.json", 'utf-8'))
        let productPageStr = await ejs.renderFile(path.join(__dirname, "../views/templates/product-page.ejs"), { products })
        return res.send(productPageStr)
    }
}