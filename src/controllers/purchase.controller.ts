import { Request, Response } from 'express'
import { PurchaseService } from '../services'
import { PurchaseCreateRequestDto, PurchaseProductUpdateRequestDto, PurchaseUpdateRequestDto } from '../dtos'
import { User } from '../entities'

export class PurchaseController {
  private purchaseService: PurchaseService

  constructor() {
    this.purchaseService = new PurchaseService()
  }

  public getPurchaseById = async (req: Request, res: Response): Promise<void> => {
    const purchaseId = req.params.id
    const user = req.user as User
    try {
      const purchase = await this.purchaseService.getPurchaseById(purchaseId, user)
      res.json(purchase)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public getPurchasesByUser = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const purchases = await this.purchaseService.getPurchasesByUser(user)
      res.json(purchases)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
  
  public createPurchase = async (req: Request, res: Response): Promise<void> => {
    const purchaseData: PurchaseCreateRequestDto = req.body
    const user = req.user as User
    try {
      const purchase = await this.purchaseService.createPurchase(purchaseData, user)
      res.json(purchase)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public getRecentDeliveryMessage = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const deliveryMessage = await this.purchaseService.getRecentDeliveryMessage(user)
      res.json({ deliveryMessage: deliveryMessage })
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public updatePurchase = async (req: Request, res: Response): Promise<void> => {
    const purchaseData: PurchaseUpdateRequestDto = req.body
    const purchaseId = req.params.id
    const user = req.user as User
    try {
      const purchase = await this.purchaseService.updatePurchase(purchaseId, purchaseData, user)
      res.json(purchase)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public updatePurchaseProduct = async (req: Request, res: Response): Promise<void> => {
    const purchaseProductData: PurchaseProductUpdateRequestDto = req.body
    const purchaseProductId = req.params.id
    const user = req.user as User
    try {
      const purchaseProduct = await this.purchaseService.updatePurchaseProduct(purchaseProductId, purchaseProductData, user)
      res.json(purchaseProduct)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public deletePurchase = async (req: Request, res: Response): Promise<void> => {
    const purchaseId = req.params.id
    const user = req.user as User
    try {
      await this.purchaseService.getPurchaseById(purchaseId, user)
      const result = await this.purchaseService.deletePurchase(purchaseId)
      res.json(result)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
}