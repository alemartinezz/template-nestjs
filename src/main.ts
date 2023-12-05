import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());

	const configService = app.get(ConfigService);

	app.setGlobalPrefix(configService.get<string>('API_PREFIX'));

	await app.listen(configService.get<number>('API_PORT', 3000));
}

bootstrap();
