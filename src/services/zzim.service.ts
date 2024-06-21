import { DeleteResult } from 'typeorm'
import { ZzimCreateRequestDto, ZzimResponseDto } from '../dtos'
import { Zzim, User } from '../entities'
import { ZzimRepository } from '../repositories'
import { plainToInstance } from 'class-transformer'

export class ZzimService {
  private zzimRepository: ZzimRepository

  constructor() {
    this.zzimRepository = new ZzimRepository()
  }

  public getZzimById = async (zzimId: string, user: User): Promise<ZzimResponseDto> => {
    const zzim = this.zzimRepository.findZzimById(parseInt(zzimId), user)
    return plainToInstance(ZzimResponseDto, zzim)
  }

  public getZzimsByUser = async (user: User): Promise<ZzimResponseDto[]> => {
    const zzims = await this.zzimRepository.findZzimsByUser(user)
    return zzims.map(zzim => plainToInstance(ZzimResponseDto, zzim))
  }

  public createZzim = async (zzimData: ZzimCreateRequestDto, user: User): Promise<ZzimResponseDto> => {
    const Zzim = await this.zzimRepository.findZzimByUserAndProductId(zzimData.productId, user)
    if (Zzim) throw new Error("해당 상품의 위시리스트가 존재합니다")
    const zzim = this.zzimRepository.createZzim(zzimData, user)
    return plainToInstance(ZzimResponseDto, zzim)
  }

  public deleteZzim = (zzimId: string): Promise<DeleteResult> => {
    return this.zzimRepository.deleteZzim(parseInt(zzimId))
  }

  public getZzimedProducts = (user: User) => {
    return this.zzimRepository.getZzimedProducts(user)
  }
}