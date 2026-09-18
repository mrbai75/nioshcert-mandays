import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

// Query params untuk senarai mandays
export class ListMandaysQueryDto {
  @IsOptional()
  @IsString()
  standard?: string;

  @IsOptional()
  @IsString()
  complexity?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  fte?: number;
}