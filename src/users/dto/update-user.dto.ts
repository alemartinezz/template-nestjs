import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsNotEmpty()
	@IsString()
	@Length(4, 20)
	readonly username: string;

	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@IsNotEmpty()
	@IsString()
	@Length(8, 30)
	readonly password: string;
}
