import { DeleteResult } from 'typeorm'
import { HomeProductResponseDto, ZzimCreateRequestDto, ZzimResponseDto, ProductResponseDto } from '../dtos'
import { Zzim, User } from '../entities'
import { ZzimRepository } from '../repositories'
import { plainToInstance } from 'class-transformer'

export class ZzimService {
  private zzimRepository: ZzimRepository

  constructor() {
    this.zzimRepository = new ZzimRepository()
  }

  public createZzim = async (zzimData: ZzimCreateRequestDto, user: User): Promise<ZzimResponseDto> => {
    const Zzim = await this.zzimRepository.findZzimByUserAndProductId(zzimData.productId, user)
    if (Zzim) throw new Error("해당 상품의 위시리스트가 존재합니다")
    const zzim = await this.zzimRepository.createZzim(zzimData, user)
    return plainToInstance(ZzimResponseDto, {...zzim, product: plainToInstance(ProductResponseDto, zzim.product)})
  }

  public deleteZzim = (productId: string, user: User): Promise<DeleteResult> => {
    return this.zzimRepository.deleteZzim(parseInt(productId), user)
  }

  public getZzimedProducts = async (user: User) => {
    const { raw, entities } = await this.zzimRepository.getZzimedProducts(user)
    return Promise.all(entities.map(async (zzim, i) => plainToInstance(HomeProductResponseDto, {...zzim.product, averageRating: parseFloat(raw[i].averageRating), reviewCount: parseInt(raw[i].reviewCount), totalAmount: parseInt(raw[i].totalAmount)/(parseInt(raw[i].reviewCount) || 1), isZzimed: true})))
  }
}