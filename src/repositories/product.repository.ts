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
  public getProductList = (page: number, pageSize: number, petType: number | undefined, productType: number | undefined, orderBy: number | undefined): Promise<Product[]> => {
    // const options: FindManyOptions<Product> = {
    //   skip: (page - 1) * pageSize, // 건너뛸 레코드 수 계산
    //   take: pageSize, // 가져올 레코드 수 설정
    //   where: petType === 0 ? {} : petType === 1 ? [{ petType: 0 }, { petType: 1 }] : [{ petType: 0 }, { petType: 2 }]
    // }
    // // 페이지네이션을 적용하여 상품 목록 조회
    // return this.productListRepository.find(options)
    const orderByMap = [
      ['product.updatedAt', 'DESC'],
      ['product.averageRating', 'DESC'],
      ['product.averageRating', 'ASC'],
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
      .skip((page-1)*pageSize)
      .take(pageSize)
    if ([1, 2].includes(petType || 0)) querybuilder.where("product.petType = :petType OR product.petType = 0", { petType })
    if ([1, 2, 3].includes(productType || 0)) querybuilder.andWhere("product.productType = :productType OR product.productType = 0", { productType })
    return querybuilder.getMany()
  }

  public getCount = (petType: number | undefined, productType: number | undefined): Promise<number> => {
    const querybuilder = this.productListRepository.createQueryBuilder('product')
    if ([1, 2].includes(petType || 0)) querybuilder.where("product.petType = :petType OR product.petType = 0", { petType })
    if ([1, 2, 3].includes(productType || 0)) querybuilder.andWhere("product.productType = :productType OR product.productType = 0", { productType })
    return querybuilder.getCount()
  }

  public getProductDetail = async (productId: number): Promise<{
    product: Product;
    productDetail: ProductDetail
  } | null> => {
    const productDetail = await this.productDetailRepository.findOne({
      where: { id: productId },
      relations: ['productId']
    });

    const product = await this.productListRepository.findOne({
      where: { id: productId },
      relations: ['options', 'optionCombinations', 'category']
    })



    if (!productDetail || !product) {
      return null;
    }

    // productId에 해당하는 모든 Review를 가져옴
    productDetail.reviews = await this.reviewRepositoryInstance.getReviewsByProductId(productId);

    return {productDetail, product} || null;
  }
}