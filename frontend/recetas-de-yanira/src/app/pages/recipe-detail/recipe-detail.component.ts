import { Component, OnInit } from '@angular/core';
import { Ingredient, Recipe, RecipesService } from '../../services/recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  ingredients: Ingredient[] = [];
  error = '';
  loading = false;
  stepsArray: string[] = [];


  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const recipeId = +id;
      this.loading = true;

      this.recipeService.getRecipeById(recipeId).subscribe({
        next: (data) => {
          this.recipe = data;
          if (this.recipe && this.recipe.steps) {
            this.stepsArray = this.recipe.steps
              .split(/\d+\.\s*/)    
              .filter(step => step.trim().length > 0);  
          } else {
            this.stepsArray = [];
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Error cargando la receta';
          this.loading = false;
        }
      });

      this.recipeService.getIngredientsByRecipe(recipeId).subscribe({
        next: (data) => this.ingredients = data,
        error: () => this.error = 'Error cargando ingredientes'
      });
    }
  }
}
