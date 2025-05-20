import { Component, OnInit } from '@angular/core';
import { Recipe, RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  loading = false;
  error = '';
  searchTerm = '';


  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error cargando recetas';
        this.loading = false;
      }
    });
  }

  filterRecipes() {
    const term = this.searchTerm.toLowerCase();
    this.filteredRecipes = this.recipes.filter(recipe => {
      const nameMatch = recipe.name.toLowerCase().includes(term);
      return nameMatch;
    });
     this.error = this.filteredRecipes.length === 0 && this.searchTerm.trim() !== ''
    ? 'No se encontraron recetas con ese nombre.'
    : '';
}

searchByIngredient() {
  if (this.searchTerm.trim() === '') return;

  this.loading = true;
  this.recipeService.getRecipesByIngredient(this.searchTerm).subscribe({
    next: (data) => {
      this.filteredRecipes = data;
      this.loading = false;
      if (data.length === 0) {
        this.error = 'No se encontraron recetas con ese ingrediente';
      } else {
        this.error = '';
      }
    },
    error: () => {
      this.error = 'Error al buscar por ingrediente';
      this.loading = false;
    }
  });
}

}

