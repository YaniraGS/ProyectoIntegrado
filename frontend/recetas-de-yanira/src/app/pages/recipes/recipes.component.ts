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
  searchRecipe= '';
  searchIngredient='';


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
    const term = this.searchRecipe.toLowerCase();
    this.filteredRecipes = this.recipes.filter(recipe => {
      const nameMatch = recipe.name.toLowerCase().includes(term);
      return nameMatch;
    });
     this.error = this.filteredRecipes.length === 0 && this.searchRecipe.trim() !== ''
    ? 'No se encontraron recetas con ese nombre.'
    : '';
}

searchByIngredient() {
  if (this.searchIngredient.trim() === '') return;

  this.loading = true;
  this.recipeService.getRecipesByIngredient(this.searchIngredient).subscribe({
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

