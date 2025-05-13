// src/app/header/header.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { SignupComponent } from '../auth/signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  openLogin() {
    this.dialog.open(LoginComponent);
  }

  openSignup() {
    this.dialog.open(SignupComponent);
  }

  logout() {
    this.authService.logout();
  }
}