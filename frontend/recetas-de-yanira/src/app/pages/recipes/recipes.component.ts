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
  loading = false;
  error = '';

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
}
