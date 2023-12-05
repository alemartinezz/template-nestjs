import * as bcrypt from 'bcrypt';
import { UserDto } from '../src/users/dto/get-user.dto';
import { User } from '../src/users/entities/user.entity';

export async function hashPassword(password: string): Promise<string> {
	const saltRounds = 10;
	const hash = await bcrypt.hash(password, saltRounds);
	return hash;
}

export function toUserDto(user: User): UserDto {
	const { password, ...usuarioDto } = user;
	return usuarioDto;
}
