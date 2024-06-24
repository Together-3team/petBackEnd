import { GroupBuying, Product } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { ProductByGroupBuyingDto } from '../dtos/groupBuying/product.by.group.buying.dto'
import { GroupUserDto } from '../dtos/groupBuying/group.user.dto'

export class GroupBuyingRepository {
  private groupBuyingRepository = AppDataSource.getRepository(GroupBuying)
  private productRepository = AppDataSource.getRepository(Product)


  public findById = async (id: number): Promise<GroupBuying | null> => {
    return await this.groupBuyingRepository.findOne({
      relations: ['purchaseProducts'],
      where: { id }
    })
  }
  public save = async (groupBuying: GroupBuying): Promise<GroupBuying> => {
    return await this.groupBuyingRepository.save(groupBuying);
  }
  public getProductByGroupBuying = async (id: number): Promise<ProductByGroupBuyingDto[]> => {
    try{
      const product = await this.productRepository.createQueryBuilder('product')
        .leftJoinAndSelect('product.groupBuying', 'groupBuying')
        .leftJoinAndSelect('groupBuying.purchaseProducts', 'purchaseProduct')
        .leftJoinAndSelect('purchaseProduct.user', 'user')
        .where('product.id = :id', { id })
        .orderBy('CASE WHEN groupBuying.status = 0 THEN 0 ELSE 1 END', 'ASC')
        .addOrderBy('groupBuying.createdAt', 'DESC')
        .getOne();

      if (!product) {
        return [];
      }

      return product.groupBuying.map(gb => {
        const userGroup: GroupUserDto[] = (gb.purchaseProducts ?? []).map(pp => ({
          nickname: pp.user.nickname,
        }));

        return {
          id: gb.id,
          status: gb.status,
          userGroup,
        };
      });
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}