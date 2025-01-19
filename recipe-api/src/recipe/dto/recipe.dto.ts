export class RecipeDto {
        description: string;
        ingredients: IngredientDto[];
}

export class IngredientDto {
    name: string;
    unit: Unit;
    quantity: number;
}

export enum Unit {
    MILLILETERS = 'milliliters',
    LITERS = 'liters',
    GRAMS = 'grams',
    KILOGRAMS = 'kilograms',
    SPOONS = 'spoons',
    CUPS = 'cups',
    PIECES = 'pieces'
}