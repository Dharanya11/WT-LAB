import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-detail" *ngIf="product">
      <h2>{{ product.name }}</h2>
      <div class="detail-content">
        <img [src]="'assets/images/' + product.image" [alt]="product.name" class="product-image">
        <div class="product-info">
          <p><strong>Price:</strong> \${{ product.price }}</p>
          <p><strong>Description:</strong> {{ product.description || 'No description available' }}</p>
          <button routerLink="/products" class="back-btn">Back to Products</button>
        </div>
      </div>
    </div>
    <div *ngIf="!product" class="loading">
      Product not found or loading...
    </div>
  `,
  styles: [`
    .product-detail {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .detail-content {
      display: flex;
      gap: 2rem;
      margin-top: 1rem;
    }
    .product-image {
      width: 300px;
      height: 300px;
      object-fit: contain;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .product-info {
      flex: 1;
    }
    .back-btn {
      padding: 0.5rem 1rem;
      background: #3f51b5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }
    @media (max-width: 768px) {
      .detail-content {
        flex-direction: column;
      }
      .product-image {
        width: 100%;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.product = this.productsService.getProductById(+id);
    }
  }
}