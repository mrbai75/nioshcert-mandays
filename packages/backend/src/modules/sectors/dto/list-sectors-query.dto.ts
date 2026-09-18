import { IsOptional, IsString } from 'class-validator';

// Query params untuk senarai sectors
export class ListSectorsQueryDto {
  @IsOptional()
  @IsString()
  standard?: string;

  @IsOptional()
  @IsString()
  complexity?: string;

  @IsOptional()
  @IsString()
  search?: string;
}