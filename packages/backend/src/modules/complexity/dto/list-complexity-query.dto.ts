import { IsOptional, IsString } from 'class-validator';

// Query params untuk senarai complexity
export class ListComplexityQueryDto {
  @IsOptional()
  @IsString()
  standard?: string;

  @IsOptional()
  @IsString()
  levelCode?: string;
}