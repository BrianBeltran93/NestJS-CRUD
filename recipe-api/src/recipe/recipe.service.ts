import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Recipe } from './entity/recipe';
import { RecipeDto } from './dto/recipe.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user';

@Injectable()
export class RecipeService {

    constructor(
        @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
        @InjectRepository(User) private userRepository: Repository<User>) {}

    async getRecipes(): Promise<Recipe[]> {
        return await this.recipeRepository.find();
    }

    async getRecipe(id: string): Promise<Recipe> {
        const recipe = await this.recipeRepository.findOne({ where: { id } });
        if (!recipe) {
          throw new HttpException('No entity found', HttpStatus.NOT_FOUND);
        }
        return recipe;
    }

    async createRecipe(recipeDto: RecipeDto, userEmail: string): Promise<void> {
        const user = await this.userRepository.findOneOrFail({
          where: { email: userEmail },
        });
        await this.recipeRepository.save({ ...recipeDto, user });
    }

    async updateDescription(
        id: string,
        description: string,
        email: string,
      ): Promise<void> {
        const recipe = await this.recipeRepository.findOneOrFail({
          where: { id },
          relations: ['user'],
        });
    
        if (recipe.user.email !== email) {
          throw new HttpException(
            "You cannot update recipe. It's not yours!",
            400,
          );
        }
    
        await this.recipeRepository.update({ id }, { description });
    }

    async deleteRecipe(id: string): Promise<void> {
        await this.recipeRepository.delete({ id });
    }
}
