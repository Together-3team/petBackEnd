import { Option, Product, Review } from '../entities'
import { ProductRepository } from '../repositories'
import { ProductDetailResponseDTO } from '../dtos'

export class ProductService {
  private productRepository: ProductRepository

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public getProductById = (productId: string): Promise<Product> => {
    return this.productRepository.getProductById(parseInt(productId))
  }

  public getProductList = (page: number, pageSize: number, preferredPet: number): Promise<Product[]> => {
    return this.productRepository.getProductList(page, pageSize, preferredPet)
  }

  public makeOptions = async (options: Option[] | undefined) => {
    return options?.reduce((acc, option) => {
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

  public makeReviews = async (reviews: Review[]): Promise<{ reviewCount: number; rating: number }> => {
    // 리뷰 없을 경우
    if (reviews.length === 0) return { rating: 0, reviewCount: 0 };

    // 리뷰 평점
    const totalRating = reviews.reduce((sum, review) => {
      if (review.rating !== undefined) {
        return sum + review.rating;
      } else {
        return sum;
      }
    }, 0);

    // 리뷰 총 개수
    const reviewCount = reviews.length;

    // 리뷰의 평균 평점 계산
    const rating = totalRating / reviewCount;

    return { rating, reviewCount };
  }

  public getProductDetail = async (productId: number): Promise<{
    productImages: any;
    originalPrice: any;
    productId: any;
    reviewCount: any;
    price: any;
    options: any;
    thumbNailImage: any;
    optionCombinations: any;
    title: any;
    category: any;
    descriptionImages: any;
    reviewRating: any
  }> => {
    const result = await this.productRepository.getProductDetail(productId);


    let makeOptions;
    let makeReviews;

    if (result?.product?.options) {
      makeOptions = await this.makeOptions(result?.product?.options);
    }

    if (result?.productDetail?.reviews) {
      makeReviews = await this.makeReviews(result?.productDetail.reviews);
    }

    // 필요한 데이터만 추출
    return {
      productImages: result?.productDetail?.productImages,
      descriptionImages: result?.productDetail?.descriptionImages,
      thumbNailImage: result?.productDetail?.productId?.thumbNailImage,
      title: result?.productDetail?.productId?.title,
      originalPrice: result?.productDetail?.productId?.originalPrice,
      price: result?.productDetail?.productId?.price,
      reviewRating: makeReviews?.rating,
      reviewCount: makeReviews?.reviewCount,
      productId: result?.productDetail?.productId?.id,
      category: result?.product?.category?.categoryStr,
      options: makeOptions,
      optionCombinations: result?.product?.optionCombinations?.map(({ createdAt, ...rest }) => rest),
    }
  }
}