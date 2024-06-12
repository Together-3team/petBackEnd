import { DeleteResult } from 'typeorm'
import { ZzimCreateRequestDto, ZzimResponseDto } from '../dtos'
import { Zzim, User } from '../entities'
import { ZzimRepository } from '../repositories'

export class ZzimService {
  private zzimRepository: ZzimRepository

  constructor() {
    this.zzimRepository = new ZzimRepository()
  }

  public getZzimById = (zzimId: string, user: User): Promise<ZzimResponseDto> => {
    return this.zzimRepository.findZzimById(parseInt(zzimId), user)
  }

  public getZzimsByUser = (user: User): Promise<ZzimResponseDto[]> => {
    return this.zzimRepository.findZzimsByUser(user)
  }

  public createZzim = async (zzimData: ZzimCreateRequestDto, user: User): Promise<ZzimResponseDto> => {
    const Zzim = await this.zzimRepository.findZzimByUserAndProductId(zzimData.productId, user)
    if (Zzim) throw new Error("해당 상품의 위시리스트가 존재합니다")
    return this.zzimRepository.createZzim(zzimData, user)
  }

  public deleteZzim = (zzimId: string): Promise<DeleteResult> => {
    return this.zzimRepository.deleteZzim(parseInt(zzimId))
  }
}