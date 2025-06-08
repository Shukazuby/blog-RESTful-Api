import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AiService } from './ai.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WriteDto } from './dto/dtos';

@ApiTags('Customer Service')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('rewrite')
  @ApiOperation({ summary: 'rewrite a message' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async rewrite(@Body() payload: WriteDto) {
    const result = await this.aiService.rewriteMessage(payload);
    return { result };
  }

  @Post('reply-enquiry')
  @ApiOperation({ summary: 'Reply a message' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async handleInquiry(@Body() payload: WriteDto) {
    const result = await this.aiService.handleInquiry(payload);
    return { result };
  }

  @Post('chatbot/command')
  @ApiOperation({ summary: 'Chatbot' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async chatbot(@Body() payload: WriteDto) {
    const result = await this.aiService.chatbot(payload);
    return { result };
  }

  @Post('editor-in-chief')
  @ApiOperation({ summary: 'Chatbot' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async editor(@Body() payload: WriteDto) {
    const result = await this.aiService.editor(payload);
    return { result };
  }
}
