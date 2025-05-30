import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  showModal= false;



  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.registerForm = this.fb.group({
      name:['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required,Validators.minLength(6)]
    }, { validators: this.passwordMatchValidator });
  }


  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }


  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.errorMessage = 'Por favor, revisa los errores en el formulario antes de continuar.';
      return;
    }

    const { email, password, name} = this.registerForm.value;
    this.authService.register(email, password, name).subscribe({
      next: () => this.showModal=true,
      error: () => this.errorMessage = 'Error al registrarse. El correo electrónico ya existe.'
    });

  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/login']);
  }

  getErrorMessage(field: string): string | null {
    const control = this.registerForm.get(field);

    if (control && control.touched && control.invalid) {
      if (control.errors?.['required']) {
        return 'Este campo es obligatorio';
      }
      if (control.errors?.['email']) {
        return 'El formato del correo no es válido';
      }
      if (control.errors?.['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `Debe tener al menos ${requiredLength} caracteres`;
      }
    }
    if (field === 'confirmPassword' && this.registerForm.errors?.['passwordMismatch'] && control?.touched) {
      return 'Las contraseñas no coinciden';
    }
    return null;
  }

}