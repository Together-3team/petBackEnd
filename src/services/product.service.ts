import { Option, Product, Review, User } from '../entities'
import { ProductRepository, PurchaseProductRepository, ZzimRepository } from '../repositories'
import { HomeProductResponseDto, OptionResponseDto, PaginationDto, ProductDetailResponseDTO } from '../dtos'
import { plainToInstance } from 'class-transformer';

export class ProductService {
  private productRepository: ProductRepository
  private zzimRepository: ZzimRepository
  private purchaseProductRepository: PurchaseProductRepository

  constructor() {
    this.productRepository = new ProductRepository();
    this.zzimRepository = new ZzimRepository();
    this.purchaseProductRepository = new PurchaseProductRepository();
  }

  public getProductById = (productId: string): Promise<Product> => {
    return this.productRepository.getProductById(parseInt(productId))
  }

  public getProductList = async (page: number, pageSize: number, petType: number | undefined, productType: number | undefined, orderBy: number | undefined, keyword: string | undefined, hot: boolean, user: User): Promise<PaginationDto<HomeProductResponseDto>> => {
    const products = await this.productRepository.getProductList(petType, productType, orderBy, keyword, hot)
    const raw = (products.raw as any[]).slice((page-1)*pageSize, page*pageSize)
    const entities = products.entities.slice((page-1)*pageSize, page*pageSize)
    const productResponses = await Promise.all(entities.map(async (product, i) => {
      const zzim = user.id ? await this.zzimRepository.findZzimByUserAndProductId(product.id, user) : null
      return zzim ? plainToInstance(HomeProductResponseDto, {...product, averageRating: parseFloat(raw[i].averageRating), reviewCount: parseInt(raw[i].reviewCount), totalAmount: parseInt(raw[i].totalAmount)/(parseInt(raw[i].reviewCount) || 1), isZzimed: true}):
        plainToInstance(HomeProductResponseDto, {...product, averageRating: parseFloat(raw[i].averageRating), reviewCount: parseInt(raw[i].reviewCount), totalAmount: parseInt(raw[i].totalAmount)/(parseInt(raw[i].reviewCount) || 1), isZzimed: false})
    }))
    return { page, pageSize, totalCount: products.entities.length, data: productResponses}
  }

  public getProductTypeFromRecentPurchase = async (user: User): Promise<number> => {
    if (!user.id) return 0
    const purchaseProduct = await this.purchaseProductRepository.getRecentPurchaseProduct(user)
    if (!purchaseProduct.length) return 0
    const product = await this.productRepository.getProductById(purchaseProduct[0].productId)
    return product.productType
  }

  public makeOptions = async (options: Option[] | undefined) => {
    return options?.reduce((acc, option) => {
      const { id, optionKey, optionValue, optionPrice } = option;
      if (optionKey !== undefined && id !== undefined && optionValue !== undefined) { // 타입 가드 추가
        if (!acc[optionKey]) {
          acc[optionKey] = [];
        }
        acc[optionKey].push(plainToInstance(OptionResponseDto, option));
      }
      return acc;
    }, {} as Record<string, OptionResponseDto[]>);
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