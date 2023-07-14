import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../services/shopping/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  slsub: Subscription;
  shoppingListLoaded: boolean = false;

  constructor(private _shoppingListService:ShoppingListService) {

  }

  ngOnInit(): void {
      this._shoppingListService.getIngredientList();
      this.slsub = this._shoppingListService.ingredientsChanged$
      .subscribe(
        (ingredients :Ingredient[]) => {
          this.ingredients = ingredients;
          this.shoppingListLoaded = true;
        }
      );

  }

  onEditIngredient(index): void {
    this._shoppingListService.editingIngredient$.next(index);
  }

  ngOnDestroy(): void {
    this.slsub.unsubscribe();
  }

}
