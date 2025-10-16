import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogoAlumnoComponent } from '../dialogo-alumno/dialogo-alumno.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface Alumno {
  id: number;
  nombre: string;
  curso: string;
  nota: number;
}

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    DialogoAlumnoComponent,
    ToastModule,
  ],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
  providers: [MessageService],
})
export class ListaAlumnosComponent {
  alumnos: Alumno[] = [
    { id: 1, nombre: 'Laura García', curso: 'Angular Básico', nota: 8.5 },
    { id: 2, nombre: 'Carlos Pérez', curso: 'TypeScript Avanzado', nota: 9.1 },
    { id: 3, nombre: 'Ana López', curso: 'PrimeNG UI', nota: 7.8 },
  ];

  filtro = '';
  mostrarDialogo = false;
  alumnoSeleccionado: Alumno = { id: 0, nombre: '', curso: '', nota: 0 };

  constructor(private messageService: MessageService) {}

  get alumnosFiltrados(): Alumno[] {
    if (!this.filtro.trim()) return this.alumnos;
    const term = this.filtro.toLowerCase();
    return this.alumnos.filter(
      (a) =>
        a.nombre.toLowerCase().includes(term) ||
        a.curso.toLowerCase().includes(term)
    );
  }

  abrirDialogo() {
    this.alumnoSeleccionado = { id: 0, nombre: '', curso: '', nota: 0 };
    this.mostrarDialogo = true;
  }

  guardarAlumno(alumno: Alumno) {
    if (alumno.id === 0) {
      alumno.id = this.alumnos.length + 1;
      this.alumnos.push(alumno);
      this.messageService.add({
        severity: 'success',
        summary: 'Guardado',
        detail: 'Alumno agregado correctamente.',
      });
    } else {
      const index = this.alumnos.findIndex((a) => a.id === alumno.id);
      if (index >= 0) this.alumnos[index] = alumno;
      this.messageService.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Alumno actualizado.',
      });
    }
  }

  editarAlumno(alumno: Alumno) {
    this.alumnoSeleccionado = { ...alumno };
    this.mostrarDialogo = true;
  }

  eliminarAlumno(alumno: Alumno) {
    this.alumnos = this.alumnos.filter((a) => a.id !== alumno.id);
    this.messageService.add({
      severity: 'warn',
      summary: 'Eliminado',
      detail: 'Alumno eliminado.',
    });
  }
}
