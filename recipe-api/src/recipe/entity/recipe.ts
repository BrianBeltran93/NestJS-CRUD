import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Unit } from "../dto/recipe.dto";


@Entity({name: 'recipe'})
export class Recipe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @OneToMany(() => Ingredient, ingredient => ingredient.recipe, {cascade: true, eager: true})
    ingredients: Ingredient[];
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