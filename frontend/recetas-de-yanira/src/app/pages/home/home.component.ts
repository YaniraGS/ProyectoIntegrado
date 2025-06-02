import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}

