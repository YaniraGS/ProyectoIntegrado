import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Receta {
  id: number;
  name: string;
  category: string;
  cuisineType: string;
  servings: number;
  preparationTime: number;
  cookingTime:number;
  steps: string;
  totalTime: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {}

  getRecetas(filtros: { name?: string; ingredients?: string[] } = {}): Observable<Receta[]> {
    let params = new HttpParams();

    if (filtros.name) {
      params = params.set('name', filtros.name);
    }

    if (filtros.ingredients && filtros.ingredients.length > 0) {
      params = params.set('ingredients', filtros.ingredients.join(','));
    }

    return this.http.get<Receta[]>(this.apiUrl, { params });
  }
}
