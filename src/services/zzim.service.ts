import { DeleteResult } from 'typeorm'
import { CreateZzimDto } from '../dtos'
import { Zzim, User } from '../entities'
import { ZzimRepository } from '../repositories'

export class ZzimService {
  private zzimRepository: ZzimRepository

  constructor() {
    this.zzimRepository = new ZzimRepository()
  }

  public getZzimById = (zzimId: string): Promise<Zzim> => {
    return this.zzimRepository.findZzimById(parseInt(zzimId))
  }

  public getZzimsByUser = (user: User): Promise<Zzim[]> => {
    return this.zzimRepository.findZzimsByUser(user)
  }

  public createZzim = async (zzimData: CreateZzimDto, user: User): Promise<Zzim> => {
    const Zzim = await this.zzimRepository.findZzimByUserAndProduct(user, zzimData.product)
    if (Zzim) throw new Error("해당 상품의 위시리스트가 존재합니다")
    return this.zzimRepository.createZzim(zzimData, user)
  }

  public deleteZzim = (zzimId: string): Promise<DeleteResult> => {
    return this.zzimRepository.deleteZzim(parseInt(zzimId))
  }
}