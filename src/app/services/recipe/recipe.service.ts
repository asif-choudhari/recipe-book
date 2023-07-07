import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { ShoppingListService } from '../shopping/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Test Recipe 1', 'Testing the recipe', 'https://images.unsplash.com/photo-1688152853061-06bd109e6c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',[new Ingredient(100,'French Fries', 20), new Ingredient(101,'Meat', 1)]),
    new Recipe('Test Recipe 2', 'Testing the recipe', 'https://www.bibbyskitchenat36.com/wp-content/uploads/2021/01/DSC_9104-1.jpg',[new Ingredient(103, 'Buns', 2), new Ingredient(102, 'Meat', 1)])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }
  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  editRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
