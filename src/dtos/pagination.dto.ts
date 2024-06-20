
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductPaginationResponseDto:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *         pageSize:
 *           type: integer
 *         totalCount:
 *           type: integer
 *         data:
 *           $ref: '#/components/schemas/HomeProductListResponseDto'
 */

export class PaginationDto<T> {
  page!: number
  pageSize!: number
  totalCount!: number
  data!: T[]
}