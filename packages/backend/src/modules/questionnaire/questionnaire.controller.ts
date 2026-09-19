import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { ListQuestionnaireQueryDto } from './dto/list-questionnaire-query.dto';
import { ValidateAnswersDto } from './dto/validate-answers.dto';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  // POST /api/questionnaire/validate
  @Post('validate')
  async validate(@Body() dto: ValidateAnswersDto) {
    const result = await this.questionnaireService.validateAnswers(dto);
    return { success: true, data: result };
  }

  // POST /api/questionnaire/detect-complexity
  @Post('detect-complexity')
  async detectComplexity(@Body() dto: ValidateAnswersDto) {
    const result = await this.questionnaireService.detectComplexity(dto);
    return { success: true, data: result };
  }

  // GET /api/questionnaire?standards=ISMS,QMS
  @Get()
  async findQuestions(@Query() query: ListQuestionnaireQueryDto) {
    const result = await this.questionnaireService.findQuestions(query);
    return { success: true, data: result };
  }

  // GET /api/questionnaire/:standard
  @Get(':standard')
  async findByStandard(@Param('standard') standard: string) {
    const result = await this.questionnaireService.findQuestions({ standards: standard });
    return { success: true, data: result };
  }
}