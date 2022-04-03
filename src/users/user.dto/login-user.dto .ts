import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsString } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class LoginUserDto extends OmitType(CreateUserDto, ['email'] as const) {
    @ApiProperty()
    @IsNumber()
    id: number
}
