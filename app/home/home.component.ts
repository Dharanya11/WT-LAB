import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  featuredCategories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03',
      route: '/products?category=electronics'
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
      route: '/products?category=accessories'
    },
  {
    name: 'Gaming Consoles',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e',
    route: '/products?category=gaming'
  }

  ];
}