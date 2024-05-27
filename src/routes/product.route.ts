import express, { Router } from 'express'
import { ProductController } from '../controllers'

const router: Router = express.Router()
const productController = new ProductController();

router.get('/', productController.getProductList);

export default router