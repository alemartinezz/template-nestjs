import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoadService } from './dataLoad.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: +configService.get('DB_PORT') || 5432,
				username: configService.get('DB_USER'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_NAME'),
				entities: [__dirname + '/../**/*.entity{.ts,.js}'],
				synchronize: true
			}),
			inject: [ConfigService]
		}),
		TypeOrmModule.forFeature([User])
	],
	providers: [DataLoadService, UserService]
})
export class DatabaseModule implements OnModuleInit {
	constructor(private dataLoadService: DataLoadService) {}

	async onModuleInit() {
		await this.dataLoadService.loadMockedUsers();
	}
}
