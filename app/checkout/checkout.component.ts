// src/app/checkout/checkout.component.ts
import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  errorMessage: string | null = null;
  isLoading = false;

  constructor(private orderService: OrderService) {}

  onPurchase() {
    this.isLoading = true;
    this.errorMessage = null;

    const orderData = { /* your order data */ };

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Handle success
        console.log('Order successful', response);
      },
      error: (err) => {
        this.isLoading = false;
        this.handleError(err);
      }
    });
  }

  private handleError(error: any) {
    if (error.status === 0) {
      this.errorMessage = `
        Connection error: 
        1. Is the backend server running? (http://localhost:3000)
        2. Check CORS settings in your backend
        3. Try refreshing the page
      `;
    } else {
      this.errorMessage = error.message || 'Unknown error occurred';
    }
  }
}