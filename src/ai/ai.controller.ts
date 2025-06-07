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
  rewrite(@Body() payload: WriteDto) {
    return this.aiService.rewriteMessage(payload);
  }

  @Post('complete/text')
  @ApiOperation({ summary: 'complete a message' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  autocompleteReply(@Body() payload: WriteDto) {
    return this.aiService.autocompleteReply(payload);
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
  handleInquiry(@Body() payload: WriteDto) {
    return this.aiService.handleInquiry(payload);
  }
}
