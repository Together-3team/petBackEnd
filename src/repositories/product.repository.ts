import { Product, ProductDetail, Review } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { FindManyOptions } from 'typeorm'
import { ReviewRepository } from './review.repository'

export class ProductRepository {
  private productListRepository = AppDataSource.getRepository(Product)
  private productDetailRepository = AppDataSource.getRepository(ProductDetail)

  private reviewRepositoryInstance = new ReviewRepository()

  public getProductById = (id: number): Promise<Product> => {
    return this.productListRepository.findOneByOrFail({id})
  }
  
  // 페이지 번호와 페이지 크기를 사용하여 상품 목록을 가져오는 메서드
  public getProductList = async (petType: number | undefined, productType: number | undefined, orderBy: number | undefined, keyword: string | undefined, hot: boolean): Promise<{entities: Product[], raw: any}> => {
    const orderByMap = [
      ['product.updatedAt', 'DESC'],
      ['averageRating', 'DESC'],
      ['averageRating', 'ASC'],
      ['product.price', 'DESC'],
      ['product.price', 'ASC'],
    ]

    const querybuilder = this.productListRepository.createQueryBuilder('product')
      .leftJoin('product.reviews', 'review')
      .leftJoin('product.optionCombinations', 'optionCombination')
      .addSelect('AVG(review.rating)', 'averageRating')
      .addSelect('COUNT(review.id)', 'reviewCount')
      .addSelect('SUM(optionCombination.amount)', 'totalAmount')
      .groupBy('product.id')
      .orderBy(orderByMap[orderBy || 0][0], orderByMap[orderBy || 0][1] as 'DESC' | 'ASC')
    if ([1, 2].includes(petType || 0)) querybuilder.andWhere("product.petType = :petType OR product.petType = 0", { petType })
    if ([1, 2, 3].includes(productType || 0)) querybuilder.andWhere("product.productType = :productType OR product.productType = 0", { productType })
    if (keyword) querybuilder.where('product.title LIKE :keyword', { keyword: `%${keyword}%` })
    if (hot) querybuilder.having("averageRating >= 4.5")
    return querybuilder.getRawAndEntities()
  }

  public getProductDetail = (productId: number): Promise<Product> => {
    return this.productListRepository.findOneOrFail({
      where: { id: productId },
      relations: ['options', 'optionCombinations', 'detail', 'reviews', 'reviews.user']
    })
  }
}