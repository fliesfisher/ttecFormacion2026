import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TableModule, ButtonModule],
  template: `
    <div class="products-card">
      <h2>Productos</h2>
      <p-table [value]="products" [paginator]="true" [rows]="10">
        <ng-template pTemplate="header">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr>
            <td>{{product.id}}</td>
            <td>{{product.name}}</td>
            <td>{{product.price | currency}}</td>
            <td>{{product.categoryName}}</td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [
    `.products-card { max-width: 960px; margin: 1rem auto; padding: 1rem; background: #fff; border-radius: 8px; }
     p-table { width: 100%; }`
  ]
})
export class ProductsComponent {
  products: any[] = [];

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    this.http.get<any[]>('http://localhost:2502/api/products')
      .subscribe({ next: (res) => (this.products = res), error: (err) => console.error(err) });
  }
}
