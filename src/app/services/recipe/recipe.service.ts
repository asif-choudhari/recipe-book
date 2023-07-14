import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { ShoppingListService } from '../shopping/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { Observable, Subject } from 'rxjs';
import { API_CONFIG } from 'src/app/shared/configs/api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly url = API_CONFIG.baseUrl + '/api/recipe';
  recipesChanged$ = new Subject<Recipe[]>();
  recipeCache: Recipe;

  private recipes: Recipe[] = [];

  constructor(private http: HttpClient,
    private shoppingListService: ShoppingListService) { }

  getRecipesList(): void {
    this.http.get<Recipe[]>(this.url+'/getRecipesList')
    .subscribe(
      (response) => {
        this.recipes = response as Recipe[];
        this.recipesChanged$.next(this.recipes.slice());
      }
    );
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get<Recipe>(this.url+'/getRecipeById', { params : { id: id }});
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.http.post<Ingredient>(this.url+'/addRecipe', recipe)
    .subscribe(() => {
      this.getRecipesList();
      console.log('Added Successfully....');
    })
  }

  editRecipe(id: number, recipe: Recipe): void {
    this.http.put(this.url+'/updateRecipe', recipe, { params: { id: id } })
    .subscribe(() => {
      this.getRecipesList();
      console.log('Updated Successfully....');
    });
  }

  deleteRecipe(id: number) {
    this.http.delete(this.url+'/deleteRecipe', { params: { id: id } })
    .subscribe(() => {
      this.getRecipesList();
      console.log("Deleted Successfully....");
    });
  }

  cacheRecipe(recipe: Recipe): void {
    this.recipeCache = recipe;
  }

  getCachedRecipe(): Recipe {
    return this.recipeCache;
  }

  clearRecipeCache(): void {
    this.recipeCache = undefined;
    console.log("Cache Cleaned");

  }

}
