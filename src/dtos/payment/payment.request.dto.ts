import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class PaymentRequestDto {

  @IsString()
  @IsNotEmpty()
  selectedProductIds?: string;

  @IsNumber()
  @IsNotEmpty()
  deliveryId?: number;

  @IsNumber()
  groupBuyingId?: number;

  @IsNumber()
  amount?: number;

  @IsNotEmpty()
  @IsString()
  orderId?: string;

  @IsNotEmpty()
  @IsString()
  deliveryMessage?: string;

  @IsNotEmpty()
  @IsString()
  paymentKey?: string;
}