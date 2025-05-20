import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../services/recipes.service';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  standalone: false,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: string[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }
  removeIngredient(ingredient: string) {
    this.ingredients = this.ingredients.filter(i => i !== ingredient);
  }

  clearList() {
    this.shoppingListService.clearList();
    this.ingredients = [];
  }
}