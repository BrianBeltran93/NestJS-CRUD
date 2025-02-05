import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto } from './dto/recipe.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { AccessTokenGuard } from 'src/auth/guard/acesss-token.guard';
import { Role } from 'src/auth/decorators/role';
import { UserRole } from 'src/auth/entity/user';
import { RoleGuard } from 'src/auth/guard/authorization.guard';

@Controller('recipe')
export class RecipeController {

    constructor(private recipeService: RecipeService) {}

    @Get()
    async getRecipes() {
        return await this.recipeService.getRecipes();
    }

    @Get('/:id')
    async getRecipe(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.recipeService.getRecipe(id);
    }

    @UseGuards(AccessTokenGuard)
    @Post()
    async createRecipe(@Body() recipeDto: RecipeDto, @Request() req) {
        const {sub} = req.user;
        return await this.recipeService.createRecipe(recipeDto, sub);
    }

    @UseGuards(AccessTokenGuard)
    @Patch('/:id')
    async updateDescription(
        @Body() { description }: UpdateDescriptionDto, 
        @Param('id', new ParseUUIDPipe()) id: string,
        @Request() req) {
        const {sub} = req.user;
        return await this.recipeService.updateDescription(id, description, sub);
    }

    @Role(UserRole.ADMIN)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Delete('/:id')
    async deleteRecipe(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.recipeService.deleteRecipe(id);
    }
}
