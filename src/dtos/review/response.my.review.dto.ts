import { IsDate, IsNumber, IsString } from 'class-validator'
import { Timestamp } from 'typeorm'

export class ResponseMyReviewDto {
  @IsNumber()
  id?: number = 0;

  @IsNumber()
  rating?: number = 0;

  @IsString()
  reviewImages?: string = '';

  @IsString()
  description?: string = '';

  @IsString()
  combinationName?: string = '';

  @IsNumber()
  quantity?: number = 0;

  @IsString()
  thumbNailImage?: string = '';

  @IsString()
  title?: string = '';

  @IsDate()
  createdAt?: Timestamp;

  constructor(data: Partial<ResponseMyReviewDto>) {
    Object.assign(this, data);
  }
}