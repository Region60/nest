import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber,  } from 'class-validator'

export class GetAllUserDto {
    @ApiProperty()
    @IsNumber()
    count: number

    @ApiProperty()
    @IsNumber()
    page: number

}