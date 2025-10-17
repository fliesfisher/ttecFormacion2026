import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TableModule, ButtonModule],
  template: `
    <div class="products-card">
      <h2>Administrar Productos (Admin)</h2>
      <div class="actions">
        <button pButton type="button" label="Añadir" class="p-button-success" (click)="add()"></button>
      </div>
      <p-table [value]="products" [paginator]="true" [rows]="10">
        <ng-template pTemplate="header">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr>
            <td>{{product.id}}</td>
            <td>{{product.name}}</td>
            <td>{{product.price | currency}}</td>
            <td>{{product.categoryName}}</td>
            <td>
              <button pButton type="button" icon="pi pi-pencil" class="p-button-warning" (click)="edit(product)"></button>
              <button pButton type="button" icon="pi pi-trash" class="p-button-danger" (click)="remove(product)"></button>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
  styles: [
    `.products-card { max-width: 960px; margin: 1rem auto; padding: 1rem; background: #fff; border-radius: 8px; }
     .actions { margin-bottom: 0.5rem; }
     p-table { width: 100%; }`
  ]
})
export class AdminProductsComponent {
  products: any[] = [];

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    this.http.get<any[]>('http://localhost:2502/api/products')
      .subscribe({ next: (res) => (this.products = res), error: (err) => console.error('load products', err) });
  }

  add() {
    const name = prompt('Nombre del producto:');
    if (!name) return;
    const description = prompt('Descripción (opcional):') || undefined;
    const priceStr = prompt('Precio:');
    const price = priceStr ? parseFloat(priceStr) : 0;
    const stockStr = prompt('Cantidad en stock (entero):', '0');
    const stockQuantity = stockStr ? parseInt(stockStr, 10) : 0;
    const categoryIdStr = prompt('CategoryId (número, deja vacío si no aplica):');
    const categoryId = categoryIdStr ? parseInt(categoryIdStr, 10) : null;
    const imageUrl = prompt('Image URL (opcional):') || undefined;
    const dto: any = { name, description, price, stockQuantity };
    if (categoryId !== null && !isNaN(categoryId)) dto.categoryId = categoryId;
    if (imageUrl) dto.imageUrl = imageUrl;
    this.http.post('http://localhost:2502/api/products', dto)
      .subscribe({ next: () => this.load(), error: (e) => console.error('add', e) });
  }

  edit(product: any) {
    const name = prompt('Nombre:', product.name);
    if (name === null) return;
    const description = prompt('Descripción (opcional):', product.description || '') || undefined;
    const priceStr = prompt('Precio:', String(product.price));
    const price = priceStr ? parseFloat(priceStr) : product.price;
    const stockStr = prompt('Cantidad en stock (entero):', String(product.stockQuantity || 0));
    const stockQuantity = stockStr ? parseInt(stockStr, 10) : (product.stockQuantity || 0);
    const categoryIdStr = prompt('CategoryId (número, deja vacío si no quiere cambiar):', String(product.categoryId ?? ''));
    const categoryId = categoryIdStr ? parseInt(categoryIdStr, 10) : product.categoryId;
    const imageUrl = prompt('Image URL (opcional):', product.imageUrl || '') || undefined;
    const dto: any = { id: product.id, name, description, price, stockQuantity, categoryId, imageUrl };
    this.http.put(`http://localhost:2502/api/products/${product.id}`, dto)
      .subscribe({ next: () => this.load(), error: (e) => console.error('edit', e) });
  }

  remove(product: any) {
    if (!confirm(`¿Eliminar producto ${product.name}?`)) return;
    this.http.delete(`http://localhost:2502/api/products/${product.id}`)
      .subscribe({ next: () => this.load(), error: (e) => console.error('delete', e) });
  }
}
