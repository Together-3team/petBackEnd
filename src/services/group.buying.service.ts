import { GroupBuyingRepository } from '../repositories'
import { Product } from '../entities'
import { ObjectLiteral } from 'typeorm'
import { ProductByGroupBuyingDto } from '../dtos/groupBuying/product.by.group.buying.dto'

export class GroupBuyingService {
  private groupBuyingRepository: GroupBuyingRepository

  constructor() {
    this.groupBuyingRepository = new GroupBuyingRepository();
  }

  public getProductByGroupBuying = async (pid: number): Promise<ProductByGroupBuyingDto[]> => {
    try {
      return await this.groupBuyingRepository.getProductByGroupBuying(pid);
    } catch (error) {
      throw new Error('getProductByGroupBuyingError');
    }
  }

}