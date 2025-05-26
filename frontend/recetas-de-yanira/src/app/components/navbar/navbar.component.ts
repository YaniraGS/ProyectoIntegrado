import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  favoritesCount: number = 0;
  favoritesSub!: Subscription;
  
  constructor(public authService: AuthService, private router: Router,private favoritesService: FavoritesService) {}
  
  ngOnInit() {
   this.favoritesSub = this.favoritesService.favoritesCount$.subscribe(count => {
      this.favoritesCount = count;
    });
    this.favoritesService.getFavorites().subscribe();
  }

  ngOnDestroy() {
    this.favoritesSub.unsubscribe();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}