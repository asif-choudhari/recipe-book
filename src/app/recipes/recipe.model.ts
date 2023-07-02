import { Ingredient } from "../shared/models/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(name: string, decription: string, imagePath: string, ingredients: Ingredient[]){
        this.name = name;
        this.description = decription;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
}
