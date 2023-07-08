import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private router: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe( params => {
      this.id = +params["id"];
      this.recipe = this.recipeService.getRecipeById(this.id);
    });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.route.navigate(["/recipes"]);
  }

  onAddToShoppingList() {
    this.recipeService.onAddToShoppingList(this.recipe.ingredients)
  }
}
