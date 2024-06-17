/**
 * @swagger
 * components:
 *   schemas:
 *     CreateDeliveryDto:
 *       type: object
 *       required:
 *         - name
 *         - zipCode
 *         - address
 *         - detailedAddress
 *       properties:
 *         name:
 *           type: string
 *           description: 배송지명
 *         recipient:
 *           type: string
 *           description: 수령인
 *         recipientPhoneNumber:
 *           type: string
 *           description: 수령인 연락처
 *         zipCode:
 *           type: integer
 *           description: 우편 번호
 *         address:
 *           type: string
 *           description: 주소지
 *         detailedAddress:
 *           type: string
 *           description: 상세 주소
 *         instruction:
 *           type: string
 *           nullable: true
 *           description: 요청 사항
 */
export class CreateDeliveryDto {
  name: string
  recipient: string
  recipientPhoneNumber: string
  zipCode: number
  address: string
  detailedAddress: string
  instruction?: string

  constructor(name: string, recipient: string, recipientPhoneNumber: string, zipCode: number, address: string, detailedAddress: string) {
    this.name = name
    this.recipient = recipient
    this.recipientPhoneNumber = recipientPhoneNumber
    this.zipCode = zipCode
    this.address = address
    this.detailedAddress = detailedAddress
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateDeliveryDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: 배송지명
 *         recipient:
 *           type: string
 *           description: 수령인
 *         recipientPhoneNumber:
 *           type: string
 *           description: 수령인 연락처
 *         zipCode:
 *           type: integer
 *           description: 우편 번호
 *         address:
 *           type: string
 *           description: 주소지
 *         detailedAddress:
 *           type: string
 *           description: 상세 주소
 *         isDefault:
 *           type: boolean
 *           description: 기본 배송지 여부
 *         instruction:
 *           type: string
 *           nullable: true
 *           description: 요청 사항
 */
export class UpdateDeliveryDto {
  name?: string
  recipient?: string
  recipientPhoneNumber?: string
  zipCode?: number
  address?: string
  detailedAddress?: string
  isDefault?: boolean
  instruction?: string
}
