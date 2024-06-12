import { Product, User, Zzim } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { ZzimCreateRequestDto, ZzimResponseDto } from '../dtos'
import { DeleteResult } from 'typeorm'
import { plainToInstance } from 'class-transformer'

export class ZzimRepository {
  private zzimRepo = AppDataSource.getRepository(Zzim)

  public findZzimById = async (id: number, user: User): Promise<ZzimResponseDto> => {
    const zzim = this.zzimRepo.findOneByOrFail({id, user: {id: user.id}})
    return plainToInstance(ZzimResponseDto, zzim)
  }

  public findZzimByUserAndProductId = async (productId: number, user: User): Promise<ZzimResponseDto | null> => {
    const zzim = this.zzimRepo.findOneBy({user: {id: user.id}, product: {id: productId}})
    return plainToInstance(ZzimResponseDto, zzim)
  }
  
  public findZzimsByUser = async (user: User): Promise<ZzimResponseDto[]> => {
    const zzims = await this.zzimRepo.findBy({user: {id: user.id}})
    return zzims.map(zzim => plainToInstance(ZzimResponseDto, zzim))
  }

  public createZzim = async (zzimData: ZzimCreateRequestDto, user: User): Promise<ZzimResponseDto> => {
    const newZzim = this.zzimRepo.create({...zzimData, user})
    const result = await this.zzimRepo.insert(newZzim)
    return this.zzimRepo.findOneByOrFail({id: result.identifiers[0].id})
  }

  public deleteZzim = (id: number): Promise<DeleteResult> => {
    return this.zzimRepo.delete({id})
  }
}