import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/home" routerLinkActive="active">Home</a></li>
        <li><a routerLink="/about" routerLinkActive="active">About</a></li>
        <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
        <li><a routerLink="/products" routerLinkActive="active">Products</a></li>
        <li><a routerLink="/login" routerLinkActive="active">Login</a></li>
        <li><a routerLink="/signup" routerLinkActive="active">Signup</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    nav ul { list-style-type: none; padding: 0; display: flex; gap: 20px; }
    nav a { text-decoration: none; color: #333; padding: 5px 10px; }
    nav a.active { background-color: #007bff; color: white; border-radius: 3px; }
  `]
})
export class NavigationComponent {}