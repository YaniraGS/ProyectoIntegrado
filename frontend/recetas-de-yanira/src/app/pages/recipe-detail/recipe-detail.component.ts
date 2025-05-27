import { Component, OnInit } from '@angular/core';
import { Ingredient, Recipe, RecipesService } from '../../services/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListService } from '../../services/shopping-list.service';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites.service';


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
  showModal = false;
  showErrorModal = false;
  selectedServings: number = 0;
  recipeId!: number;
  userId!: number;
  showModalList = false;
  showErrorModalList = false;


  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService,
    private favoritesService: FavoritesService


  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const recipeId = +id;
      this.loading = true;

      this.recipeService.getRecipeById(recipeId).subscribe({
        next: (data) => {
          this.recipe = data;
          this.selectedServings = data.servings;
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
        next: (data) => {
          this.ingredients = data;
        },
        error: () => this.error = 'Error cargando ingredientes'
      });
    }

    const user = this.authService.getUser();
    if (user && user.id) {
      this.userId = user.id;
    }
  }

  getAdjustedQuantity(ingredient: Ingredient): number | null {
    if (!this.recipe || !ingredient.quantity) return null;
    return (ingredient.quantity * this.selectedServings) / this.recipe.servings;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  addToShoppingList(userId: number, recipeId: number): void {
    this.shoppingListService.addRecipeToShoppingListWithServings(userId, recipeId, this.selectedServings).subscribe({
      next: res => { this.showModalList = true; },
      error: err => { this.showErrorModalList = true; }
    });
  }

  addToFavorites(recipeId: number) {
    this.favoritesService.addFavorite(recipeId).subscribe({
      next: () => this.showModal = true,
      error: () => this.showErrorModal = true,
    });
  }

  closeModal() {
    this.showModal = false;
    this.showErrorModal = false;
    this.showModalList = false;
    this.showErrorModalList = false;
  }



}