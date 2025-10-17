import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <div class="home-card p-card">
      <div class="p-card-body">
        <h1>Bienvenido a la Tienda</h1>
        <p>Utiliza el menú para navegar. Regístrate o inicia sesión para ver y gestionar productos.</p>
      </div>
    </div>
  `,
  styles: [
    `.home-card { max-width: 720px; margin: 2rem auto; padding: 1rem; text-align: center; }`
  ]
})
export class HomeComponent {}
