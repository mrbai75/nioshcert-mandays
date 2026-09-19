import { IsOptional, IsString } from 'class-validator';

// Query params untuk ambil questionnaire
export class ListQuestionnaireQueryDto {
  @IsOptional()
  @IsString()
  standards?: string; // "ISMS,QMS,ABMS"

  @IsOptional()
  @IsString()
  version?: string;
}