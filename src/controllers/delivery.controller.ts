import { Request, Response } from 'express'
import { DeliveryService } from '../services'
import { User } from '../entities'
import { DeliveryCreateRequestDto, DeliveryUpdateRequestDto } from '../dtos'

export class DeliveryController {
  private deliveryService: DeliveryService

  constructor() {
    this.deliveryService = new DeliveryService()
  }

  public getDeliveryById = async (req: Request, res: Response): Promise<void> => {
    const deliveryId = req.params.id
    const user = req.user as User
    try {
      const delivery = await this.deliveryService.getDeliveryById(deliveryId)
      res.json(delivery)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public getDeliveriesByUser = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const deliveries = await this.deliveryService.getDeliveriesByUser(user)
      res.json(deliveries)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
  
  public getDefaultDelivery = async (req: Request, res: Response): Promise<void> => {
    const user = req.user as User
    try {
      const delivery = await this.deliveryService.getDefaultDelivery(user)
      res.json(delivery)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
  
  public createDelivery = async (req: Request, res: Response): Promise<void> => {
    const deliveryData: DeliveryCreateRequestDto = req.body
    const user = req.user as User
    try {
      const delivery = await this.deliveryService.createDelivery(deliveryData, user)
      res.json(delivery)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public updateDelivery = async (req: Request, res: Response): Promise<void> => {
    const deliveryId = req.params.id
    const deliveryData: DeliveryUpdateRequestDto = req.body
    const user = req.user as User
    try {
      const delivery = await this.deliveryService.getDeliveryById(deliveryId)
      const updatedDelivery = await this.deliveryService.updateDelivery(deliveryId, deliveryData)
      res.json(updatedDelivery)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }

  public deleteDelivery = async (req: Request, res: Response): Promise<void> => {
    const deliveryId = req.params.id
    const user = req.user as User
    try {
      const delivery = await this.deliveryService.getDeliveryById(deliveryId)
      const result = await this.deliveryService.deleteDelivery(deliveryId)
      res.json(result)
    } catch (error) {
      const errorMessage = (error as Error).message
      res.status(500).json({ error: errorMessage })
    }
  }
}