import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './shared/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children:[
    { path: '', component: RecipeStartComponent },
  ] },
  { path: 'recipes/new', component: RecipeEditComponent, canActivate: [AuthGuard] },
  { path: 'recipes/:id', component: RecipeDetailComponent, canActivate: [AuthGuard] },
  { path: 'recipes/:id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]},
  {path: "shopping-list", component: ShoppingListComponent, canActivate: [AuthGuard] },
  {path: 'auth', component: AuthComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
