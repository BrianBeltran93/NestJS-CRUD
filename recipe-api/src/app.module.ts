import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient, Recipe } from './recipe/entity/recipe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, validate}),
    RecipeModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>('DB_NAME'),
        entities: [Recipe, Ingredient],
        synchronize: false,
        logging: configService.get<boolean>('DB_LOGGING'),
      })
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
