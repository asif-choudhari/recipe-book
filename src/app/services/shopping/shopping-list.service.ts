import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { API_CONFIG } from 'src/app/shared/configs/api.config';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private readonly url = API_CONFIG.baseUrl + '/api/ingredient';
  ingredientsChanged$ = new Subject<Ingredient[]>();
  editingIngredient$ = new Subject<number>();

  private ingredients: Ingredient[] = [];

  constructor(private http: HttpClient) { }

  getIngredientList(): void {
    this.http.get<Ingredient[]>(this.url+'/getIngredientsList')
    .subscribe(
      (response) => {
        this.ingredients = response as Ingredient[];
        this.ingredientsChanged$.next(this.ingredients.slice());
      }
    );
  }


  getIngredientById(id: number): Ingredient {
    let ingredient: Ingredient = this.ingredients.find(ingredient => ingredient.id === id);
    return ingredient;
  }

  addIngredient(ingredient: Ingredient): void {
    this.http.post<Ingredient>(this.url+'/addIngredient', ingredient)
    .subscribe(
      (response) => {
        this.getIngredientList();
        console.log('Added Successfully....');
      }
    );
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged$.next(this.ingredients.slice());
  }

  editIngredient(id: number, ingredient: Ingredient): void {
    this.http.put(this.url+'/updateIngredient', ingredient, { params: { id: id } })
    .subscribe((response) => {
      this.getIngredientList();
      console.log('Added Successfully....');
    });
  }

  deleteIngredient(id: number): void {
    this.http.delete(this.url+'/deleteIngredient', { params: { id: id } })
    .subscribe((response) => {
      this.getIngredientList();
      console.log("Deleted Successfully....");
    });
  }

}
