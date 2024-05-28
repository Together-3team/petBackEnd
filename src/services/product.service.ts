import { Option, Product } from '../entities'
import { ProductRepository } from '../repositories'
import { ProductDetailResponseDTO } from '../dtos'

export class ProductService {
  private productRepository: ProductRepository

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public getProductList = (page: number, pageSize: number): Promise<Product[]> => {
    return this.productRepository.getProductList(page, pageSize)
  }

  public makeOptions = async (options: Option[]) => {
    return options.reduce((acc, option) => {
      const { id, optionKey, optionValue } = option;
      if (optionKey !== undefined && id !== undefined && optionValue !== undefined) { // 타입 가드 추가
        if (!acc[optionKey]) {
          acc[optionKey] = [];
        }
        acc[optionKey].push({ id, optionValue });
      }
      return acc;
    }, {} as Record<string, { id: number; optionValue: string }[]>);
  }

  public getProductDetail = async (productId: number): Promise<ProductDetailResponseDTO> => {
    const productDetail = await this.productRepository.getProductDetail(productId);

    let makeOptions;

    if (productDetail?.options) {
      makeOptions = await this.makeOptions(productDetail?.options);
    }

    // 필요한 데이터만 추출
    return {
      productImages: productDetail?.productImages,
      descriptionImages: productDetail?.descriptionImages,
      thumbNailImage: productDetail?.productId?.thumbNailImage,
      title: productDetail?.productId?.title,
      originalPrice: productDetail?.productId?.originalPrice,
      price: productDetail?.productId?.price,
      productId: productDetail?.productId?.id,
      category: productDetail?.categoryId?.categoryStr,
      options: makeOptions,
      optionCombinations: productDetail?.optionCombinations?.map(({ createdAt, ...rest }) => rest),
    }
  }
}