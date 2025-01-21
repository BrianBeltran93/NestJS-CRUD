import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/auth/entity/user';
import { InitialSchema1737335458061 } from 'src/migrations/1737335458061-initial-schema';
import { AddUser1737422234635 } from 'src/migrations/1737422234635-add-user';
import { Ingredient, Recipe } from 'src/recipe/entity/recipe';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>("DB_PASSWORD"),
    database: configService.get<string>('DB_NAME'),
    logging: configService.get<boolean>('DB_LOGGING'),
    entities: [Recipe, Ingredient, User],
    migrations: [InitialSchema1737335458061, AddUser1737422234635],
})