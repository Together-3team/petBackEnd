export interface ReviewCreateRequestDto {
  productId?: number;
  purChaseProductId?: number;
  rating?: number;
  reviewImages?: string;
  description?: string;
}