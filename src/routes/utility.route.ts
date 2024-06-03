import express, { Router } from 'express';
import { UtilityController } from '../controllers';
import passport from 'passport';

const UtilityRouter: Router = express.Router();
const utilityController = new UtilityController();

/**
 * @swagger
 * tags:
 *   name: Utility
 *   description: 유틸리티
 */

/**
 * @swagger
 * /utility/presigned-urls:
 *   post:
 *     summary: Generate presigned URLs for S3 objects
 *     tags: [Utility]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     objectKey:
 *                       type: string
 *                       example: image1.jpg
 *                     contentType:
 *                       type: string
 *                       example: image/jpeg
 *     responses:
 *       200:
 *         description: Presigned URLs generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 presignedUrls:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: https://s3.ap-northeast-2.amazonaws.com/review-image-3team/image1.jpg?...
 *                       uniqueFileName:
 *                         type: string
 *                         example: fjer2i3rjfj.jpg
 *       400:
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: items array is required and must not be empty
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */

UtilityRouter.post('/presigned-urls',passport.authenticate('jwt', { session: false }), utilityController.generatePresignedUrls);

export default UtilityRouter;
