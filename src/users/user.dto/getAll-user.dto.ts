import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class GetAllUserDto {
    @ApiProperty()
    @IsString()
    count: number

    @ApiProperty()
    @IsEmail()
    page: number

}