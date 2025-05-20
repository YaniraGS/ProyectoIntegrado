import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../services/recipes.service';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favoriteRecipes: Recipe[] = [];
  loading = false;
  error = '';

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.loading = true;
    this.error = '';
    this.favoritesService.getFavorites().subscribe({
      next: (recipes) => {
        this.favoriteRecipes = recipes;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las recetas favoritas';
        this.loading = false;
      }
    });
  }

  removeFromFavorites(recipeId: number) {
    this.favoritesService.removeFavorite(recipeId).subscribe({
      next: () => {
        this.favoriteRecipes = this.favoriteRecipes.filter(r => r.id !== recipeId);
      },
      error: () => {
        alert('Error al eliminar de favoritos');
      }
    });
  }
}
