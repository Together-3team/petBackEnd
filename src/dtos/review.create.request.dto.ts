export interface ReviewCreateRequestDto {
  productId?: number;
  userId?: number;
  rating?: number;
  reviewImages?: string;
  description?: string;
}