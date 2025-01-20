import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Recipe } from './entity/recipe';
import { RecipeDto } from './dto/recipe.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecipeService {

    constructor(
        @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>) {}

    async getRecipes(): Promise<Recipe[]> {
        return await this.recipeRepository.find();
    }

    async getRecipe(id: string): Promise<Recipe> {
        const recipe = await this.recipeRepository.findOne({where: {id}});
        if (!recipe) {
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
        }
        return recipe;
    }

    async createRecipe(recipe: RecipeDto): Promise<void> {
        await this.recipeRepository.save(recipe);
    }

    async updateDescription(id: string, description: string): Promise<void> {
        await this.recipeRepository.update({id}, {description})
    }

    async deleteRecipe(id: string): Promise<void> {
        await this.recipeRepository.delete({id})
    }
}
