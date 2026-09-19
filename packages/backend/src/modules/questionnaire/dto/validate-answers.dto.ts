import { IsObject, IsArray, IsOptional } from 'class-validator';

// Body untuk validate jawapan
export class ValidateAnswersDto {
  @IsArray()
  standards!: string[];

  @IsObject()
  answers!: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  context?: Record<string, unknown>;
}