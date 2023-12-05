import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { hashPassword } from '../common/utils';
import { UserService } from '../src/users/users.service';

@Injectable()
export class DataLoadService {
	constructor(private userService: UserService) {}

	async loadMockedUsers() {
		const existingUsers = await this.userService.findAll();
		if (existingUsers.users.length === 0) {
			const mockedUsers = await this.getMockedUsers();
			for (const user of mockedUsers) {
				await this.userService.create(user);
			}
		}
	}

	private async getMockedUsers(): Promise<CreateUserDto[]> {
		return Promise.all(
			Array.from({ length: 20 }, async (_, i) => ({
				username: `user${i + 1}`,
				email: `user${i + 1}@example.com`,
				password: await hashPassword(`password${i + 1}`)
			}))
		);
	}
}
