import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schema/blog.schema';
import { Model } from 'mongoose';
import { BaseResponseTypeDTO } from 'src/utils/utils.types';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(Blog.name);
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
  ) {}

  async createBlog(dto: CreateBlogDto): Promise<BaseResponseTypeDTO> {
    try {
      const blog = new this.blogModel({
        title: dto?.title,
        subTitle: dto.subTitle,
        description: dto.description,
        content: dto.content,
        tags: dto.tags,
        images: dto.images,
        author: dto.author
      });
      const data = await blog.save();
      return {
        data: data,
        success: true,
        code: HttpStatus.CREATED,
        message: 'Blog Created',
      };
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

 async fetchBlogPosts(): Promise<BaseResponseTypeDTO> {
  const blogs = await this.blogModel.find().sort({createdAt: -1})
  if(blogs.length === 0){
    return {
      data: [],
      success: true,
      code: HttpStatus.NOT_FOUND,
      message: 'No available blog posts'
      
    }
  }
    return {
      totalCount: blogs.length,
      data: blogs,
      success: true,
      code: HttpStatus.OK,
      message: 'All blog posts fetched'
      
    }
  }

 async fetchABlog(id:string): Promise<BaseResponseTypeDTO> {
  const blog = await this.blogModel.findById(id)
  if(!blog){
    return {
      success: true,
      code: HttpStatus.NOT_FOUND,
      message: 'Not Found'
      
    }
  }
    return {
      data: blog,
      success: true,
      code: HttpStatus.OK,
      message: 'Blog post fetched'
      
    }
  }

  async editBlog(id: string, dto: UpdateBlogDto): Promise<BaseResponseTypeDTO> {
    const blog = await this.blogModel.findById(id);
    
    if (blog) {
      // Update fields if they exist in the dto
      if ('title' in dto) {
        blog.title = dto.title;
      }
      
      if ('content' in dto) {
        blog.content = dto.content;
      }
      
      if ('author' in dto) {
        if (dto.author.name) blog.author.name = dto.author.name; 
        if (dto.author.email) blog.author.email = dto.author.email;
      }
      
      if ('subTitle' in dto) {
        blog.subTitle = dto.subTitle;
      }
      
      if ('description' in dto) {
        blog.description = dto.description;
      }
      
      if ('images' in dto) {
        blog.images = dto.images;
      }
      
      if ('tags' in dto) {
        blog.tags = dto.tags;
      }
      
      // Save the updated blog document
      await blog.save();
      
      return {
        data: blog,
        success: true,
        code: HttpStatus.OK,
        message: 'Blog post updated',
      };
    } else {
      return {
        data: null,
        success: false,
        code: HttpStatus.NOT_FOUND,
        message: 'Blog post not found',
      };
    }
  }
    
  async deleteBlog(id:string): Promise<BaseResponseTypeDTO> {
    await this.blogModel.findByIdAndDelete(id)
      return {
        success: true,
        code: HttpStatus.OK,
        message: 'Blog deleted'
        
      }
    }
  }
