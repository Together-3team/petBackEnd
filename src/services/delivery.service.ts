import { DeleteResult } from 'typeorm'
import { CreateDeliveryDto, UpdateDeliveryDto } from '../dtos'
import { Delivery, User } from '../entities'
import { DeliveryRepository } from '../repositories'

export class DeliveryService {
  private deliveryRepository: DeliveryRepository

  constructor() {
    this.deliveryRepository = new DeliveryRepository()
  }

  public getDeliveryById = (deliveryId: string): Promise<Delivery> => {
    return this.deliveryRepository.findDeliveryById(parseInt(deliveryId))
  }

  public getDeliveriesByUser = (user: User): Promise<Delivery[]> => {
    return this.deliveryRepository.findDeliveriesByUser(user)
  }

  public createDelivery = (deliveryData: CreateDeliveryDto, user: User): Promise<Delivery> => {
    return this.deliveryRepository.createDelivery(deliveryData, user)
  }

  public updateDelivery = (deliveryId: string, deliveryData: UpdateDeliveryDto): Promise<Delivery> => {
    return this.deliveryRepository.updateDelivery(parseInt(deliveryId), deliveryData)
  }

  public deleteDelivery = (deliveryId: string): Promise<DeleteResult> => {
    return this.deliveryRepository.deleteDelivery(parseInt(deliveryId))
  }
}