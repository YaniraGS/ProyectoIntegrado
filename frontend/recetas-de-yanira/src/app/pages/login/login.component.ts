import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage = '';
  showPassword: boolean = false;


  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  login() {
  
  const email = this.loginForm.get('email')?.value;
  const password = this.loginForm.get('password')?.value;

  this.authService.login(email, password).subscribe({
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
  get f() {
  return this.loginForm.controls;
}

togglePassword(): void {
  this.showPassword = !this.showPassword;
}
}
