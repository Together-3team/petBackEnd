import { DeleteResult } from 'typeorm'
import { DeliveryResponseDto, PurchaseCreateRequestDto, PurchaseProductResponseDto, PurchaseProductUpdateRequestDto, PurchaseResponseDto, PurchaseUpdateRequestDto } from '../dtos'
import { Purchase, User } from '../entities'
import { PurchaseProductRepository, PurchaseRepository } from '../repositories'
import { plainToInstance } from 'class-transformer'

export class PurchaseService {
  private purchaseRepository: PurchaseRepository
  private purchaseProductRepository: PurchaseProductRepository

  constructor() {
    this.purchaseRepository = new PurchaseRepository()
    this.purchaseProductRepository = new PurchaseProductRepository()
  }

  public entityToResponseDto = (purchase: Purchase): PurchaseResponseDto => {
    const purchaseProducts = purchase.purchaseProducts.map(product => plainToInstance(PurchaseProductResponseDto, product))
    return plainToInstance(PurchaseResponseDto, {...purchase, purchaseProducts})
  }

  public getPurchaseById = async (purchaseId: string, user: User): Promise<PurchaseResponseDto> => {
    const purchase = await this.purchaseRepository.findPurchaseById(parseInt(purchaseId), user)
    return this.entityToResponseDto(purchase)
  }

  public getPurchasesByUser = async (user: User): Promise<PurchaseResponseDto[]> => {
    const purchases = await this.purchaseRepository.findPurchasesByUser(user)
    return purchases.map((purchase: Purchase) => this.entityToResponseDto(purchase))
  }

  public createPurchase = async (purchaseData: PurchaseCreateRequestDto, user: User): Promise<PurchaseResponseDto> => {
    const purchase = await this.purchaseRepository.createPurchase(purchaseData, user)
    return this.entityToResponseDto(purchase)
  }

  public getRecentDeliveryMessage = async (user: User): Promise<string> => {
    const purchase = await this.purchaseRepository.getRecentPurchase(user)
    if (!purchase.length) return ''
    else return purchase[0].deliveryMessage || ''
  }

  public updatePurchase = async (purchaseId: string, purchaseData: PurchaseUpdateRequestDto, user: User): Promise<PurchaseResponseDto> => {
    const purchase = await this.purchaseRepository.updatePurchase(parseInt(purchaseId), purchaseData, user)
    return plainToInstance(PurchaseResponseDto, purchase)
  }

  public updatePurchaseProduct = async (purchaseProductId: string, purchaseProductData: PurchaseProductUpdateRequestDto, user: User): Promise<PurchaseProductResponseDto> => {
    const purchaseProduct = await this.purchaseProductRepository.updatePurchaseProduct(parseInt(purchaseProductId), purchaseProductData, user)
    return plainToInstance(PurchaseProductResponseDto, purchaseProduct)
  }

  public deletePurchase = (purchaseId: string): Promise<DeleteResult> => {
    return this.purchaseRepository.deletePurchase(parseInt(purchaseId))
  }
}