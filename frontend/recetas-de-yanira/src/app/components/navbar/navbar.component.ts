import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router, private shoppingListService: ShoppingListService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
getShoppingListCount(): number {
    return this.shoppingListService.getIngredients().length;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}