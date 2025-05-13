import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid && this.passwordsMatch()) {
      this.isLoading = true;
      const { username, password } = this.signupForm.value;
      
      this.authService.signup(username!, password!).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.success) {
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = response.message || 'Signup failed';
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'An error occurred during signup';
          console.error('Signup error:', err);
        }
      });
    }
  }

  passwordsMatch(): boolean {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    const match = password === confirmPassword;
    
    if (!match) {
      this.errorMessage = 'Passwords do not match';
    }
    
    return match;
  }
}