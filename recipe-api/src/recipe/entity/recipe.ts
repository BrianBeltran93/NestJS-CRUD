import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Unit } from "../dto/recipe.dto";
import { User } from "src/auth/entity/user";


@Entity({name: 'recipe'})
export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @OneToMany(() => Ingredient, ingredient => ingredient.recipe, {cascade: true, eager: true})
    ingredients: Ingredient[];

    @ManyToOne(() => User, (user) => user.recipes)
    user: User
}

@Entity({name: 'ingredient'})
export class Ingredient {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({type: 'varchar'})
    unit: Unit;

    @Column({type: 'integer'})
    quantity: number;

    @ManyToOne(() => Recipe, recipe => recipe.ingredients, {onDelete: "CASCADE"})
    recipe: Recipe;
}