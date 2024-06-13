import { DeleteResult } from 'typeorm'
import { Delivery, User } from '../entities'
import { DeliveryRepository } from '../repositories'
import { DeliveryCreateRequestDto, DeliveryUpdateRequestDto } from '../dtos'
import { plainToInstance } from 'class-transformer'
import { DeliveryResponseDto } from '../dtos/delivery/delivery.response'

export class DeliveryService {
  private deliveryRepository: DeliveryRepository

  constructor() {
    this.deliveryRepository = new DeliveryRepository()
  }

  public getDeliveryById = async (deliveryId: string): Promise<DeliveryResponseDto> => {
    const delivery = this.deliveryRepository.findDeliveryById(parseInt(deliveryId))
    return plainToInstance(DeliveryResponseDto, delivery)
  }

  public getDeliveriesByUser = async (user: User): Promise<DeliveryResponseDto[]> => {
    const deliveries = await this.deliveryRepository.findDeliveriesByUser(user)
    return deliveries.map(delivery => plainToInstance(DeliveryResponseDto, delivery))
  }

  public getDefaultDelivery = async (user: User): Promise<DeliveryResponseDto | null> => {
    const delivery = await this.deliveryRepository.findDefaultDelivery(user)
    return delivery ? plainToInstance(DeliveryResponseDto, delivery) : null
  }

  public createDelivery = async (deliveryData: DeliveryCreateRequestDto, user: User): Promise<DeliveryResponseDto> => {
    const delivery = this.deliveryRepository.createDelivery(deliveryData, user)
    return plainToInstance(DeliveryResponseDto, delivery)
  }

  public updateDelivery = async (deliveryId: string, deliveryData: DeliveryUpdateRequestDto): Promise<DeliveryResponseDto> => {
    const delivery = this.deliveryRepository.updateDelivery(parseInt(deliveryId), deliveryData)
    return plainToInstance(DeliveryResponseDto, delivery)
  }

  public deleteDelivery = async (deliveryId: string): Promise<DeleteResult> => {
    return this.deliveryRepository.deleteDelivery(parseInt(deliveryId))
  }
}