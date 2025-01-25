import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseResponseTypeDTO } from 'src/utils/utils.types';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @ApiOperation({ summary: 'create blog' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'blog created' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async createBlog(
    @Body() payload: CreateBlogDto,
  ): Promise<BaseResponseTypeDTO> {

    const result = await this.blogService.createBlog( payload);
    return result;
  }

  @Get()
  findAll() {
    return this.blogService.fetchBlogs();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
