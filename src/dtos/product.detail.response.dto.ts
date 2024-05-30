import { OptionCombination } from '../entities'

export interface ProductDetailResponseDTO {
  productImages: string | undefined;
  originalPrice: number | undefined;
  productId: number | undefined;
  price: number | undefined;
  options: any;
  thumbNailImage: string | undefined;
  optionCombinations: Omit<OptionCombination, "createdAt">[] | undefined;
  title: string | undefined;
  category: number | undefined;
  reviewRating: number | undefined;
  reviewCount: number | undefined;
  descriptionImages: string | undefined;
}