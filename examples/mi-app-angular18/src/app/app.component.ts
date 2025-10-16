import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, ListaAlumnosComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mi-app-angular18';
}
