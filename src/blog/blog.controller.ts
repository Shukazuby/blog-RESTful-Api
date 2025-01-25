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
  @ApiOperation({ summary: 'Fetch blog posts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'blog posts feteched' })
  async fetchBlogPosts(): Promise<BaseResponseTypeDTO> {
    const result = this.blogService.fetchBlogPosts();
    return result
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a blog post' })
  @ApiResponse({ status: HttpStatus.OK, description: 'blog post feteched' })
  async fetchABlog(
    @Param('id') id: string
  ): Promise<BaseResponseTypeDTO> {
    const result = this.blogService.fetchABlog(id);
    return result
  }

  @Patch(':id')
  @ApiOperation({ summary: 'edit a blog post' })
  @ApiResponse({ status: HttpStatus.OK, description: 'blog post edited' })
  editBlog(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    const result = this.blogService.editBlog(id, updateBlogDto);
    return result
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a blog post' })
  @ApiResponse({ status: HttpStatus.OK, description: 'blog posts deleted' })
  deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteBlog(id);
  }
}
