import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.setSession(res.token, res.user);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = 'Email o contraseña incorrectos';
        console.error(err);
      }
    });
  }
}

