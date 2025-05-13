import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface Order {
  productName: string;
  productPrice: number;
}

interface ApiResponse {
  success: boolean;
  orderId?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  saveOrder(orderData: Order): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiUrl}/orders`, orderData).pipe(
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => ({
          message: 'Failed to save order',
          details: error,
          status: error.status
        }));
      })
    );
  }
}