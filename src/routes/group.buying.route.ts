import express, { Router } from 'express'
import { GroupBuyingController } from '../controllers'

const GroupBuyingRouter: Router = express.Router()
const groupBuyingController = new GroupBuyingController();

/**
 * @swagger
 * tags:
 *   name: GroupBuying
 *   description: GroupBuying endpoints
 */

/**
 * @swagger
 * /group-buying/{pid}:
 *   get:
 *     summary: Get group buying details for a product
 *     tags: [GroupBuying]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Group buying details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductByGroupBuyingDto'
 *       500:
 *         description: Internal server error
 */

GroupBuyingRouter.get('/:pid', groupBuyingController.getProductByGroupBuying);


export default GroupBuyingRouter