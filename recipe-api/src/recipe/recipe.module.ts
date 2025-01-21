import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entity/recipe';
import { User } from 'src/auth/entity/user';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
  imports: [TypeOrmModule.forFeature([Recipe, User])]
})
export class RecipeModule {}
