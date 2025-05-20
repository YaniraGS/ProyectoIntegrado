import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent,  },
  { path: 'register', component: RegisterComponent },
  { path: 'favorites', component: FavoritesComponent,  },
  { path: 'recipes/:id', component: RecipeDetailComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
