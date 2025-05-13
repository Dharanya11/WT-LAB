import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:4000/api/orders';

  constructor(private http: HttpClient) {}

  sendOrder(productName: string, productPrice: number, type: 'cart' | 'buy') {
    return this.http.post(this.apiUrl, { productName, productPrice, type });
  }
}
