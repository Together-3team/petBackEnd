import { User, Zzim } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { ZzimCreateRequestDto } from '../dtos'
import { DeleteResult } from 'typeorm'

export class ZzimRepository {
  private zzimRepo = AppDataSource.getRepository(Zzim)
  private userRepo = AppDataSource.getRepository(User)

  public findZzimById = async (id: number, user: User): Promise<Zzim> => {
    return this.zzimRepo.findOneByOrFail({id, user: {id: user.id}})
  }

  public findZzimByUserAndProductId = async (productId: number, user: User): Promise<Zzim | null> => {
    return this.zzimRepo.findOneBy({user: {id: user.id}, product: {id: productId}})
  }
  
  public findZzimsByUser = async (user: User): Promise<Zzim[]> => {
    return this.zzimRepo.findBy({user: {id: user.id}})
  }

  public createZzim = async (zzimData: ZzimCreateRequestDto, user: User): Promise<Zzim> => {
    const newZzim = this.zzimRepo.create({product: {id: zzimData.productId}, user})
    const result = await this.zzimRepo.insert(newZzim)
    return this.zzimRepo.findOneByOrFail({id: result.identifiers[0].id})
  }

  public deleteZzim = (productId: number): Promise<DeleteResult> => {
    return this.zzimRepo.delete({product: {id: productId}})
  }

  public getZzimedProducts = async (user: User) => {
    const querybuilder = this.zzimRepo.createQueryBuilder('zzim')
      .leftJoin('zzim.user', 'user')
      .leftJoinAndSelect('zzim.product', 'product')
      .leftJoin('product.reviews', 'review')
      .leftJoin('product.optionCombinations', 'optionCombination')
      .addSelect('AVG(review.rating)', 'averageRating')
      .addSelect('COUNT(review.id)', 'reviewCount')
      .addSelect('SUM(optionCombination.amount)', 'totalAmount')
      .groupBy('zzim.id')
      .where('user.id = :userId', { userId: user.id })
    return querybuilder.getRawAndEntities()
  }
}