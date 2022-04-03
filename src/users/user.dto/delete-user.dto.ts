import { ApiProperty, OmitType, PickType } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsString } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class DeleteUserDto extends PickType(CreateUserDto, ['username'] as const) { 
}
