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
  public getProductList = (page: number, pageSize: number): Promise<Product[]> => {
    const options: FindManyOptions<Product> = {
      skip: (page - 1) * pageSize, // 건너뛸 레코드 수 계산
      take: pageSize // 가져올 레코드 수 설정
    }
    // 페이지네이션을 적용하여 상품 목록 조회
    return this.productListRepository.find(options)
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