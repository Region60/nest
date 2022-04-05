import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class GetUserDto {
    @ApiProperty()
    @IsString()
    username?: string

    @ApiProperty()
    @IsEmail()
    email?: string

}