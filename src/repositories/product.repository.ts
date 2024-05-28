import { Product } from '../entities'
import { AppDataSource } from '../config/typeorm'
import { FindManyOptions } from 'typeorm'
import { ProductDetail } from '../entities/product.detail.entity'

export class ProductRepository {
  private productListRepository = AppDataSource.getRepository(Product)
  private productDetailRepository = AppDataSource.getRepository(ProductDetail)

  // 페이지 번호와 페이지 크기를 사용하여 상품 목록을 가져오는 메서드
  public getProductList = (page: number, pageSize: number): Promise<Product[]> => {
    console.log(page);
    console.log(pageSize);
    const options: FindManyOptions<Product> = {
      skip: (page - 1) * pageSize, // 건너뛸 레코드 수 계산
      take: pageSize // 가져올 레코드 수 설정
    }
    // 페이지네이션을 적용하여 상품 목록 조회
    return this.productListRepository.find(options)
  }

  public getProductDetail = async (productId: number): Promise<ProductDetail | null> => {
    const productDetail = await this.productDetailRepository.findOne({
      where: { id: productId },
      relations: ['productId', 'categoryId', 'options', 'optionCombinations']
    });
    return productDetail || null;
  }
}