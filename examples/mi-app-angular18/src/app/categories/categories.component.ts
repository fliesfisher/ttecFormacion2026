import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, TableModule],
  template: `
    <div class="categories-card">
      <h2>Categorías</h2>
      <p-table [value]="categories">
        <ng-template pTemplate="header">
          <tr><th>Id</th><th>Nombre</th><th>Descripción</th></tr>
        </ng-template>
        <ng-template pTemplate="body" let-cat>
          <tr><td>{{cat.id}}</td><td>{{cat.name}}</td><td>{{cat.description}}</td></tr>
        </ng-template>
      </p-table>
    </div>
  `
})
export class CategoriesComponent {
  categories: any[] = [];
  constructor(private http: HttpClient) {
    this.http.get<any[]>('http://localhost:2502/api/categories')
      .subscribe({ next: res => this.categories = res, error: err => console.error(err) });
  }
}
