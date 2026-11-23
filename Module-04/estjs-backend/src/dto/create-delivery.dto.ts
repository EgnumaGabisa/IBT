import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsString()
  @IsNotEmpty()
  area!: string;

  @IsInt()
  @Min(1)
  itemsCount!: number;
}
