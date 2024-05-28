export class ProductDetailDto {
  id?: number;
  title?: string;
  productImages?: string = '';
  descriptionImages?: string = '';
  inventory?: number = 0;
  thumbNailImage?: string = '';
  originalPrice?: number;
  price?: number;
  categoryStr?: string;
}