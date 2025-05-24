import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateContactDto {
    @ApiProperty({ example: 'Joe', description: 'First name' })
    @IsString()
    name: string;
        
    @ApiProperty({ example: 'Joe@example.com', description: 'user email' })
    @IsEmail()
    email: string;
        
    @ApiProperty({ example: 'Dear Zubaidat, I am reaching out', description: 'Email body' })
    @IsString()
    message: string;
    
  }
  

export class CreateCustomerDto {}
