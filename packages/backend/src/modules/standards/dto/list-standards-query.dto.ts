import { IsOptional, IsString, IsInt, Min, Max, IsIn, IsBooleanString } from 'class-validator';
import { Type } from 'class-transformer';

// Query params untuk senarai standard
export class ListStandardsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number = 20;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: string = 'code';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @IsBooleanString()
  isActive?: string;
}