import { Component, OnInit } from '@angular/core';
import { RecipesService } from './services/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})

  export class AppComponent implements OnInit {
  recetas: any[] = [];

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesService.getRecipes().subscribe({
      next: (data) => this.recetas = data,
      error: (err) => console.error('Error al cargar recetas', err)
    });
  }
}
