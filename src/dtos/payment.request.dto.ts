import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class PaymentRequestDto {
  @IsNumber()
  amount?: number;

  @IsNotEmpty()
  @IsString()
  orderId?: string;

  @IsNotEmpty()
  @IsString()
  orderName?: string;
}