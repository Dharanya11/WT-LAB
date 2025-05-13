// src/app/purchase/purchase.component.ts
import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {
  orderData = {
    productId: '',
    quantity: 1,
    customerInfo: {}
  };
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  apiUrl = environment.apiUrl; // Using environment variable

  constructor(private orderService: OrderService) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.orderService.createOrder(this.orderData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Purchase successful!';
        console.log('Order created:', response);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Failed to process purchase';
        console.error('Purchase error:', err);
      }
    });
  }
}