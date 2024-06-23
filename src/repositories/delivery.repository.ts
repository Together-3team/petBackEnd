import { Delivery, User } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { DeleteResult } from 'typeorm'
import { DeliveryCreateRequestDto, DeliveryUpdateRequestDto } from '../dtos'

export class DeliveryRepository {
  private deliveryRepo = AppDataSource.getRepository(Delivery)

  public removeDefault = async (user: User): Promise<void> => {
    const defaultDelivery = await this.deliveryRepo.findOneBy({user: {id: user.id}, isDefault: true})
    if (defaultDelivery) await this.deliveryRepo.save({...defaultDelivery, isDefault: false})
  }

  public findDeliveryById = async (id: number | undefined): Promise<Delivery> => {
    if (id === undefined) {
      throw new Error('Delivery ID is undefined')
    }
    return await this.deliveryRepo.findOneByOrFail({ id })
  }
  
  public findDeliveriesByUser = (user: User): Promise<Delivery[]> => {
    return this.deliveryRepo.find({order: {isDefault: 'DESC'}, where: {user: {id: user.id}}})
  }

  public findDefaultDelivery = (user: User): Promise<Delivery | null> => {
    return this.deliveryRepo.findOneBy({user: {id: user.id}, isDefault: true})
  }

  public createDelivery = async (deliveryData: DeliveryCreateRequestDto, user: User): Promise<Delivery> => {
    const newDelivery = this.deliveryRepo.create({...deliveryData, user})
    if (newDelivery.isDefault) await this.removeDefault(user)
    const result = await this.deliveryRepo.insert(newDelivery)
    return this.deliveryRepo.findOneByOrFail({id: result.identifiers[0].id})
  }

  public updateDelivery = async (id: number, deliveryData: DeliveryUpdateRequestDto): Promise<Delivery> => {
    if (deliveryData.isDefault) {
      const delivery = await this.deliveryRepo.findOneByOrFail({id})
      await this.removeDefault(delivery.user)
    }
    return this.deliveryRepo.save({...deliveryData, id})
  }

  public deleteDelivery = (id: number): Promise<DeleteResult> => {
    return this.deliveryRepo.delete({id})
  }
}