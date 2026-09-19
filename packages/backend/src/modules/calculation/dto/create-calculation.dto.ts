import { IsArray, IsObject, IsString, IsOptional, IsIn, IsNumber, Min, Max } from 'class-validator';

// Body untuk create calculation
export class CreateCalculationDto {
  @IsArray()
  @IsString({ each: true })
  standards!: string[];

  @IsObject()
  answers!: Record<string, unknown>;

  @IsOptional()
  @IsIn(['NEW', 'SURVEILLANCE', 'RECERT'])
  applicationType?: 'NEW' | 'SURVEILLANCE' | 'RECERT';

  @IsOptional()
  @IsString()
  applicationId?: string;

  @IsOptional()
  @IsString()
  complexityOverride?: string;

  @IsOptional()
  @IsString()
  complexityReason?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  imsReduction?: number; // 0.0 - 0.20 (ATD override untuk IMS)
}