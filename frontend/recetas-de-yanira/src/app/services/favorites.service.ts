import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Recipe } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3000/favorites'; // ruta base para favoritos


  private favoritesCountSubject = new BehaviorSubject<number>(0);
  favoritesCount$ = this.favoritesCountSubject.asObservable();


  constructor(private http: HttpClient) {
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


  addFavorite(recipeId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, { recipeId }, { headers }).pipe(
      tap(() => this.updateFavoritesCount())
    );
  }

  getFavorites(): Observable<Recipe[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Recipe[]>(this.apiUrl, { headers }).pipe(
      tap(favorites => this.favoritesCountSubject.next(favorites.length))
    );
  }

  removeFavorite(recipeId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(this.apiUrl, { headers, body: { recipeId } }).pipe(
      tap(() => this.updateFavoritesCount())
    );
  }

  private updateFavoritesCount() {
    this.getFavorites().subscribe(); 
  }

}
