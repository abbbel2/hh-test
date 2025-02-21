import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  depth: string;

  @IsString()
  @IsNotEmpty()
  menuId: string;

  @IsString()
  @IsOptional()
  parentId?: string;
}
