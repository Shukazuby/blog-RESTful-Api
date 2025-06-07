import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class WriteDto {
    @ApiProperty({ example: 'Hello, how can i help', description: 'Hello' })
    @IsString()
    text: string;
        
  }
