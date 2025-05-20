import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

 private ingredients: string[] = [];

  addIngredients(newIngredients: string[]) {
    newIngredients.forEach(name => {
      if (!this.ingredients.includes(name)) {
        this.ingredients.push(name);
      }
    });
  }


  getIngredients(): string[] {
    return this.ingredients;
  }

  clearList() {
    this.ingredients = [];
  }
}
