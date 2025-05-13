import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CommonModule } from '@angular/common';


interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule], // ✅ Add CommonModule here
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  isLoading = true;
  products: Product[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    setTimeout(() => {
// src/app/products/products.component.ts
this.products = [
  {
    id: 1,
    name: 'Premium Smart Watch',
    price: 249.99,
    description: 'Advanced health monitoring with 2-week battery life',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format'
  },
  {
    id: 2,
    name: 'Noise-Canceling Earbuds',
    price: 179.99,
    description: 'Crystal-clear sound with 30hr battery life',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1000&auto=format'
  },
  {
    id: 3,
    name: '4K DSLR Camera',
    price: 899.99,
    description: 'Professional photography with 4K video',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1000&auto=format'
  },
  {
    id: 4,
    name: 'Gaming Laptop',
    price: 1499.99,
    description: 'RTX 3080, 32GB RAM, 1TB SSD',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1000&auto=format'
  },
{
  id: 5,
  name: 'Premium Noise-Canceling Headphones',
  price: 349.99,
  description: 'Industry-leading noise cancellation with 40hr battery life',
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format'
},
  {
    id: 6,
    name: 'Smart Home Hub',
    price: 129.99,
    description: 'Control your entire home with voice',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1000&auto=format'
  }
];
      this.isLoading = false;
    }, 1000);
  }

  addToCart(product: Product) {
    this.orderService.sendOrder(product.name, product.price, 'cart').subscribe({
      next: () => alert('✅ Added to cart!'),
      error: (err) => console.error('Add to cart failed', err)
    });
  }

  buyNow(product: Product) {
    this.orderService.sendOrder(product.name, product.price, 'buy').subscribe({
      next: () => alert('✅ Purchase successful!'),
      error: (err) => console.error('Buy failed', err)
    });
  }
}
