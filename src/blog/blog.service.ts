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

 async fetchBlogs(): Promise<BaseResponseTypeDTO> {
    return {
      data: [],
      success: true,
      code: HttpStatus.OK,
      message: 'All blogs fetched'
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
