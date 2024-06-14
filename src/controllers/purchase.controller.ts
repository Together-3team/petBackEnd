import { Request, Response } from 'express'
import { PurchaseService } from '../services'
import { PurchaseCreateRequestDto } from '../dtos'
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