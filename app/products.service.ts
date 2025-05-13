import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 89.99,
      description: 'Premium sound quality with noise cancellation',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      description: 'Track your fitness and stay connected',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      price: 59.99,
      description: 'Portable speaker with 20h battery life',
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb'
    },
    {
      id: 4,
      name: 'Gaming Keyboard',
      price: 79.99,
      description: 'Mechanical switches for ultimate gaming',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3'
    }
  ];

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Product[] {
    return this.products;
  }

  // Get single product by ID
  getProduct(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  // Example of HTTP request (if you want to fetch from API later)
  fetchProductsFromAPI(): Observable<Product[]> {
    return this.http.get<Product[]>('https://api.example.com/products');
  }

  // Add new product (example)
  addProduct(product: Omit<Product, 'id'>): void {
    const newId = Math.max(...this.products.map(p => p.id)) + 1;
    this.products.push({ ...product, id: newId });
  }

  // Update product (example)
  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  // Delete product (example)
  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }
}