import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
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
