import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDto } from './dto/get-user.dto';
import { toUserDto } from '../../common/utils';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {}

	async create(createUserDto: CreateUserDto): Promise<{ user: UserDto }> {
		const user = this.userRepository.create(createUserDto);
		const createdUser = await this.userRepository.save(user);
		return { user: toUserDto(createdUser) };
	}

	async findAll(limit?: number, offset?: number): Promise<{ users: UserDto[] }> {
		const users = await this.userRepository.find({ take: limit, skip: offset });
		return { users: users.map(toUserDto) };
	}

	async findOne(id: string): Promise<{ user: UserDto }> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) {
			throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
		}
		return { user: toUserDto(user) };
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<{ user: UserDto }> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) {
			throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
		}
		Object.assign(user, updateUserDto);
		const updatedUser = await this.userRepository.save(user);
		return { user: toUserDto(updatedUser) };
	}

	async remove(id: string): Promise<void> {
		const result = await this.userRepository.delete(id);
		if (result.affected === 0) {
			throw new HttpException(`User not found`, HttpStatus.NOT_FOUND);
		}
	}
}
