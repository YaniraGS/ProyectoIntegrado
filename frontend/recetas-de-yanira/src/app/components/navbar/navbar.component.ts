import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  favoritesCount: number = 0;
  listCount = 0;
  userId!: number;
  userName!: string;

  private userSub!: Subscription;
  private favoritesSub!: Subscription;
  private listCountSub!: Subscription;

  constructor(
    public authService: AuthService,
    private router: Router,
    private favoritesService: FavoritesService,
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit() {
    // Escuchamos los cambios del usuario actual
    this.userSub = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.id;
        this.userName = user.name;
        this.subscribeToCounts();
      } else {
        this.userId = 0;
        this.userName = '';
        this.favoritesCount = 0;
        this.listCount = 0;
        this.unsubscribeCounts();
      }
    });
  }

  subscribeToCounts() {
    // Evitamos duplicar suscripciones
    this.favoritesSub?.unsubscribe();
    this.listCountSub?.unsubscribe();

    this.favoritesSub = this.favoritesService.favoritesCount$.subscribe(count => {
      this.favoritesCount = count;
    });

    this.shoppingListService.refreshItemCount(this.userId);

    this.listCountSub = this.shoppingListService.itemCount$.subscribe(count => {
      this.listCount = count;
    });

    this.favoritesService.getFavorites().subscribe();
  }

  unsubscribeCounts() {
    this.favoritesSub?.unsubscribe();
    this.listCountSub?.unsubscribe();
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
    this.unsubscribeCounts();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
