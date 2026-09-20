import {
  IsArray,
  IsObject,
  IsString,
  IsOptional,
  IsIn,
  IsNumber,
  IsBoolean,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// =============================================================================
// NESTED DTOs â€” Client + Application info dari frontend
// =============================================================================

export class CompanyInfoDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  legalStatus?: string;

  @IsOptional()
  @IsString()
  orgType?: string;

  @IsOptional()
  @IsBoolean()
  isBumiputera?: boolean;
}

export class PicContactDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}

export class EmployeesDto {
  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsNumber()
  management?: number;

  @IsOptional()
  @IsNumber()
  permanent?: number;

  @IsOptional()
  @IsNumber()
  contract?: number;

  @IsOptional()
  @IsNumber()
  repetitive?: number;
}

export class DocumentationDto {
  @IsOptional()
  @IsBoolean()
  established?: boolean;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsBoolean()
  manualIntegrated?: boolean;

  @IsOptional()
  @IsBoolean()
  policyIntegrated?: boolean;

  @IsOptional()
  @IsBoolean()
  internalAuditIntegrated?: boolean;
}

export class ScopeIndustryDto {
  @IsOptional()
  @IsString()
  scope?: string;

  @IsOptional()
  @IsString()
  industryType?: string;

  @IsOptional()
  @IsBoolean()
  includeSites?: boolean;

  @IsOptional()
  @IsNumber()
  sitesCount?: number;
}

export class ApplicationInfoDto {
  @ValidateNested()
  @Type(() => CompanyInfoDto)
  company!: CompanyInfoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => PicContactDto)
  pic?: PicContactDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => EmployeesDto)
  employees?: EmployeesDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ScopeIndustryDto)
  scopeIndustry?: ScopeIndustryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => DocumentationDto)
  documentation?: DocumentationDto;

  @IsOptional()
  @IsIn(['SINGLE', 'INTEGRATED'])
  certificationType?: 'SINGLE' | 'INTEGRATED';

  @IsOptional()
  @IsString()
  industryType?: string;
}

// =============================================================================
// MAIN DTO
// =============================================================================

export class CreateCalculationDto {
  @IsArray()
  @IsString({ each: true })
  standards!: string[];

  @IsObject()
  answers!: Record<string, unknown>;

  @IsOptional()
  @IsIn(['NEW', 'SURVEILLANCE', 'RECERT'])
  applicationType?: 'NEW' | 'SURVEILLANCE' | 'RECERT';

  /** Optional â€” kalau ada, calculate sahaja (tak save). Kalau ada, save ke DB. */
  @IsOptional()
  @ValidateNested()
  @Type(() => ApplicationInfoDto)
  application?: ApplicationInfoDto;

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
  imsReduction?: number;

  /** Complexity per standard (map) — cth: { OSHMS: 'MEDIUM', EMS: 'HIGH' } */
  @IsOptional()
  @IsObject()
  complexities?: Record<string, string>;
}

