import { Product, User, Zzim } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { CreateZzimDto } from '../dtos'
import { DeleteResult } from 'typeorm'

export class ZzimRepository {
  private zzimRepo = AppDataSource.getRepository(Zzim)

  public findZzimById = (id: number): Promise<Zzim> => {
    return this.zzimRepo.findOneByOrFail({id})
  }

  public findZzimByUserAndProduct = (user: User, product: Product): Promise<Zzim | null> => {
    return this.zzimRepo.findOneBy({user: {id: user.id}, product: {id: product.id}})
  }
  
  public findZzimsByUser = (user: User): Promise<Zzim[]> => {
    return this.zzimRepo.findBy({user: {id: user.id}})
  }

  public createZzim = async (zzimData: CreateZzimDto, user: User): Promise<Zzim> => {
    const newZzim = this.zzimRepo.create({...zzimData, user})
    const result = await this.zzimRepo.insert(newZzim)
    return this.zzimRepo.findOneByOrFail({id: result.identifiers[0].id})
  }

  public deleteZzim = (id: number): Promise<DeleteResult> => {
    return this.zzimRepo.delete({id})
  }
}