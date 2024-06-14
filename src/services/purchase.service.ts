import { DeleteResult } from 'typeorm'
import { DeliveryResponseDto, PurchaseCreateRequestDto, PurchaseProductResponseDto, PurchaseResponseDto } from '../dtos'
import { Purchase, User } from '../entities'
import { PurchaseRepository } from '../repositories'
import { plainToInstance } from 'class-transformer'

export class PurchaseService {
  private purchaseRepository: PurchaseRepository

  constructor() {
    this.purchaseRepository = new PurchaseRepository()
  }

  public entityToResponseDto = (purchase: Purchase): PurchaseResponseDto => {
    const delivery = plainToInstance(DeliveryResponseDto, purchase.delivery)
    const purchaseProducts = purchase.purchaseProducts.map(product => plainToInstance(PurchaseProductResponseDto, product))
    return plainToInstance(PurchaseResponseDto, {...purchase, delivery, purchaseProducts})
  }

  public getPurchaseById = async (purchaseId: string, user: User): Promise<PurchaseResponseDto> => {
    const purchase = await this.purchaseRepository.findPurchaseById(parseInt(purchaseId), user)
    return this.entityToResponseDto(purchase)
  }

  public getPurchasesByUser = async (user: User): Promise<PurchaseResponseDto[]> => {
    const purchases = await this.purchaseRepository.findPurchasesByUser(user)
    return purchases.map((purchase: Purchase) => this.entityToResponseDto(purchase))
  }

  public createPurchase = async (PurchaseData: PurchaseCreateRequestDto, user: User): Promise<PurchaseResponseDto> => {
    const purchase = await this.purchaseRepository.createPurchase(PurchaseData, user)
    return this.entityToResponseDto(purchase)
  }

  public deletePurchase = (purchaseId: string): Promise<DeleteResult> => {
    return this.purchaseRepository.deletePurchase(parseInt(purchaseId))
  }
}