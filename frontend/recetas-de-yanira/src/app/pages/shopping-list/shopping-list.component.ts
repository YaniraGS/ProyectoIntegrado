import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../services/recipes.service';
import { ShoppingItem, ShoppingListService } from '../../services/shopping-list.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shopping-list',
  standalone: false,
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  shoppingList: ShoppingItem[] = [];
  userId: number = 0;
  tachedItems = new Set<number>();


  constructor(
    private shoppingService: ShoppingListService,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
  const user = this.authService.getUser();
  if (user && user.id) {
    this.userId = user.id;
    this.loadList();
  } 
}

  loadList(): void {
    this.shoppingService.getShoppingList(this.userId).subscribe(items => {
      this.shoppingList = items;
      this.shoppingService.setItemCount(items.length);
    });
  }

  deleteItem(id: number): void {
    this.shoppingService.deleteItem(id, this.userId).subscribe(() => {
      this.loadList();
    });
  }

  clearList(): void {
    this.shoppingService.clearList(this.userId).subscribe(() => {
      this.loadList();
    });
  }

  toggleTachado(id: number): void {
    if (this.tachedItems.has(id)) {
      this.tachedItems.delete(id);
    } else {
      this.tachedItems.add(id);
    }
  }
}