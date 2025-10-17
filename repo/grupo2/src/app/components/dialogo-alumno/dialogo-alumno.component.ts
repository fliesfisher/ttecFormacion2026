import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

interface Alumno {
  id: number;
  nombre: string;
  curso: string;
  nota: number;
}

@Component({
  selector: 'app-dialogo-alumno',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './dialogo-alumno.component.html',
})
export class DialogoAlumnoComponent {
  @Input() alumno: Alumno = { id: 0, nombre: '', curso: '', nota: 0 };

  // Para que [(visible)] funcione
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() guardar = new EventEmitter<Alumno>();

  cerrar() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  guardarAlumno() {
    this.guardar.emit(this.alumno);
    this.cerrar();
  }
}
