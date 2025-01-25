import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class BaseResponseTypeDTO {
    @ApiProperty()
    success: boolean;
  
    @ApiProperty({ enum: HttpStatus, default: HttpStatus.OK })
    code: HttpStatus;
  
    @ApiProperty()
    message: string;
  
    @ApiProperty()
    data?: any;
  
    @ApiProperty()
    totalCount?: number;
  
    @ApiProperty()
    limit?: number;
  
    @ApiProperty()
    page?: number;
  
    @ApiProperty()
    search?: string;
  }
  