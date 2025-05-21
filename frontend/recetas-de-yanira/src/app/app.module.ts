import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FavoritesComponent,
    RecipesComponent,
    NavbarComponent,
    RecipeDetailComponent,
    HomeComponent,
    ShoppingListComponent,
    ReactiveFormsModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
