
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {IsEmail} from 'class-validator';

export class AuthorDetails {
@ApiProperty()
@Prop()
name: string;

@ApiProperty()
@Prop({unique: true})
@IsEmail()
email?: string; 
}
  

@Schema()
export class Blog {
  @ApiProperty({example: 'How To Write A Blog Post'})
  @Prop()
  title: string

  @ApiProperty({example: 'This is optional'})
  @Prop()
  subTitle?: string

  @ApiProperty({example: 'This is optional'})
  @Prop()
  description?: string

  @ApiProperty({example: 'Write your content here'})
  @Prop()
  content: string

  @ApiProperty()
  @Prop()
  images: string[]

  @ApiProperty()
  @Prop()
  tags: string[]
  
  @ApiProperty({type: AuthorDetails})
  @Prop({ type: AuthorDetails, required: true })
  author: AuthorDetails

  @Prop({default: Date.now}) 
  createdAt: Date;

  @Prop({default: Date.now}) 
  updatedAt: Date;

}

export type BlogDocument = Blog & Document;
export const BlogSchema = SchemaFactory.createForClass(Blog);
