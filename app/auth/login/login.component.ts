import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule  } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
  if (this.loginForm.valid) {
    this.isLoading = true;
    const { username, password } = this.loginForm.value;
    
    this.authService.login(username!, password!).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.success) {
          this.router.navigate(['/home']); // Changed from '/products' to '/home'
        } else {
          this.errorMessage = response.message || 'Login failed';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred during login';
        console.error('Login error:', err);
      }
    });
  }
}
}