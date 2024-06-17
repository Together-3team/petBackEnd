export interface ReviewCreateRequestDto {
  productId?: number;
  purchaseProductId?: number;
  rating?: number;
  reviewImages?: string;
  description?: string;
}