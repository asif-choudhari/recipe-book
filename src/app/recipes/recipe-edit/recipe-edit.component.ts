import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { AmountValidators } from 'src/app/shared/validators/amount.validator';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  recipeForm: FormGroup;
  id: number;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
    });

    this.initForm();
  }

  private initForm() {
    var name = '';
    var image = '';
    var description = '';
    var ingredientsArray = new FormArray([]);

    if (this.editMode) {
      var recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      image = recipe.imagePath;
      description = recipe.description;

      if (recipe['ingredients']) {
        for(var ingredient of recipe.ingredients) {
          ingredientsArray.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, Validators.required, AmountValidators.asyncNegativeNumberValidator)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imgUrl': new FormControl(image, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients' : ingredientsArray
    });
  }

  onSubmit() {
    this.setRecipeFromForm(this.recipeForm);
    console.log(this.recipeForm.value);

    if (this.editMode) {
      this.recipeService.editRecipe(this.id, this.recipe);
    } else {
      this.recipeService.addRecipe(this.recipe);
    }
    this.resetForm();
    this.redirectToRecipes();
  }

  resetForm(): void {
    this.editMode = false;
    this.recipeForm.reset();
  }

  addNewIngredientInput() {
    const arrayControl = this.recipeForm.get('ingredients') as FormArray;

    const ingredientFormGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required, AmountValidators.asyncNegativeNumberValidator),
    });

    arrayControl.push(ingredientFormGroup);
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  setRecipeFromForm(form: FormGroup) {
    this.recipe = form.value;
    this.recipe.imagePath = form.value.imgUrl;
  }

  redirectToRecipes() {
    this.router.navigate(['recipes']);
  }

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
