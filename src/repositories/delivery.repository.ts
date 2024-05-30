import { Delivery, User } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { CreateDeliveryDto, UpdateDeliveryDto } from '../dtos'
import { DeleteResult } from 'typeorm'

export class DeliveryRepository {
  private deliveryRepo = AppDataSource.getRepository(Delivery)

  public findDeliveryById = (id: number): Promise<Delivery> => {
    return this.deliveryRepo.findOneByOrFail({id})
  }
  
  public findDeliveriesByUser = (user: User): Promise<Delivery[]> => {
    return this.deliveryRepo.findBy({user: {id: user.id}})
  }

  public createDelivery = async (deliveryData: CreateDeliveryDto, user: User): Promise<Delivery> => {
    const newDelivery = this.deliveryRepo.create({...deliveryData, user})
    console.log(newDelivery)
    const result = await this.deliveryRepo.insert(newDelivery)
    return this.deliveryRepo.findOneByOrFail({id: result.identifiers[0].id})
  }

  public updateDelivery = (id: number, deliveryData: UpdateDeliveryDto): Promise<Delivery> => {
    return this.deliveryRepo.save({...deliveryData, id})
  }

  public deleteDelivery = (id: number): Promise<DeleteResult> => {
    return this.deliveryRepo.delete({id})
  }
}