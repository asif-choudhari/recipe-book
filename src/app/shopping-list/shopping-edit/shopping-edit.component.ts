import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShoppingListService } from 'src/app/services/shopping/shopping-list.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { AmountValidators } from '../../shared/validators/amount.validator';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  shoppingListForm: FormGroup;
  editMode = false;
  editId: number;
  editIngredient: Ingredient;

  constructor(private _shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, AmountValidators.negativeNumberValidator]),
    });

    this._shoppingListService.editingIngredient$.subscribe(
      (id: number) => {
        this.editId = id;
        this.editMode = true;
        this.editIngredient = this._shoppingListService.getIngredientById(id);
        this.shoppingListForm.patchValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount
        });
      }
    );
  }

  isFormValid(): boolean {
    return !this.shoppingListForm.valid;
  }

  resetForm(): void {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onFormSubmit(): void {
    const name = this.shoppingListForm.get('name').value;
    const amount = this.shoppingListForm.get('amount').value;
    const newIngredient = new Ingredient(0, name, amount);
    if(this.editMode) {
      this._shoppingListService.editIngredient(this.editId, newIngredient);
    } else {
      this._shoppingListService.addIngredient(newIngredient);
    }
    this.resetForm();
  }

  onDeleteItem(): void {
    this._shoppingListService.deleteIngredient(this.editId);
    this.resetForm();
  }
}
