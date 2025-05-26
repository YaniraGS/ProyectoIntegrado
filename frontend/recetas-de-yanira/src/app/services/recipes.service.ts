import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recipe {
  id: number;
  name: string;
  category: string;
  cuisineType: string;
  servings: number;
  preparation_time: number;
  cooking_time:number;
  steps: string;
  total_time: number;
  image: string;
}

export interface Ingredient {
  id: number;
  name: string;
  quantity?: number;
  units: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  getRecipeById(id: number): Observable<Recipe> {
  return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
}

getIngredientsByRecipe(recipeId: number): Observable<Ingredient[]> {
  return this.http.get<Ingredient[]>(`${this.apiUrl}/${recipeId}/ingredients`);
}

getRecipesByIngredient(name: string): Observable<Recipe[]> {
  return this.http.get<Recipe[]>(`${this.apiUrl}/search-by-ingredient?name=${name}`);
}


}
