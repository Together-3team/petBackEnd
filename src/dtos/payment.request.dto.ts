import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class PaymentRequestDto {

  @IsString()
  @IsNotEmpty()
  selectedProductIds?: string;

  @IsNumber()
  @IsNotEmpty()
  deliveryId?: number;

  @IsNumber()
  @IsNotEmpty()
  userId?: number;

  @IsNumber()
  amount?: number;

  @IsNotEmpty()
  @IsString()
  orderId?: string;

  @IsNotEmpty()
  @IsString()
  paymentKey?: string;
}