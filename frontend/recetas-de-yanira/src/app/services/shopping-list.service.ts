import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  units: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private apiUrl = 'http://localhost:3000/shopping-list';

  private itemCountSubject = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCountSubject.asObservable();


  constructor(private http: HttpClient) { }

  refreshItemCount(userId: number): void {
    this.getShoppingList(userId).subscribe(items => {
      this.itemCountSubject.next(items.length);
    });
  }

  setItemCount(count: number): void {
    this.itemCountSubject.next(count);
  }
  
  getShoppingList(userId: number): Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>(`${this.apiUrl}/${userId}`);
  }

  deleteItem(id: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.refreshItemCount(userId))
    );
  }

  clearList(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${userId}`).pipe(
      tap(() => this.refreshItemCount(userId))
    );
  }

  addRecipeToShoppingListWithServings(userId: number, recipeId: number, servings: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-recipe`, {
      userId: userId,
      recipeId: recipeId,
      servings: servings
    }).pipe(
      tap(() => this.refreshItemCount(userId))
    )
  }
}
