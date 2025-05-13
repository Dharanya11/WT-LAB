// cart.service.ts
import { Injectable } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  addToCart(product: { id: number; name: string; price: number }): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        ...product,
        quantity: 1
      });
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }
}