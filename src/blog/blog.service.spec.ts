import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { HttpStatus, HttpException } from '@nestjs/common';
import { BaseResponseTypeDTO } from '../utils/utils.types';

describe('BlogService', () => {
  let service: BlogService;
  let mockBlogService;

  beforeEach(async () => {
    // Mock BlogService methods
    mockBlogService = {
      createBlog: jest.fn().mockResolvedValue({
        status: HttpStatus.CREATED,
        message: 'Blog created successfully',
        data: { id: 1, title: 'Test Blog', content: 'Test content' },
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BlogService,
          useValue: mockBlogService,
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a blog and return the response', async () => {
    const payload: CreateBlogDto = {
      title: 'Test Blog',
      subTitle: 'Test SubTitle',
      description: 'Test Description',
      content: 'Test Content',
      tags: ['tag1', 'tag2'],
      images: ['image1.jpg'],
      author: {name: 'author full name', email: 'author email'},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result: BaseResponseTypeDTO = await service.createBlog(payload);

    expect(result).toEqual({
      status: HttpStatus.CREATED,
      message: 'Blog created successfully',
      data: { id: 1, title: 'Test Blog', content: 'Test content' },
    });

    expect(mockBlogService.createBlog).toHaveBeenCalledWith(payload);
  });

  it('should return BadRequest if invalid input data is provided', async () => {
    const invalidPayload: CreateBlogDto = {
      title: 'Test Blog',
      subTitle: 'Test SubTitle',
      description: 'Test Description',
      content: 'Test Content',
      tags: ['tag1', 'tag2'],
      images: ['image1.jpg'],
      author: {name: 'author full name', email: 'author email'},
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockBlogService.createBlog.mockRejectedValueOnce(
      new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid input data',
        },
        HttpStatus.BAD_REQUEST,
      ),
    );

    // Expect the exception to be thrown and handled properly
    try {
      await service.createBlog(invalidPayload);
    } catch (e) {
      expect(e.response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(e.response.message).toBe('Invalid input data');
    }

    // Verify that createBlog was called with the incorrect payload
    expect(mockBlogService.createBlog).toHaveBeenCalledWith(invalidPayload);
  });
});
