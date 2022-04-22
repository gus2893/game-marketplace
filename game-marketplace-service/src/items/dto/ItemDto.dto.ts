import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ItemDto {
  @Exclude()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  sales_expiry: number;

  @IsNotEmpty()
  owner: number;
}
