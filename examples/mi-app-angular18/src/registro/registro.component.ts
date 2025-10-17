import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../app/services/auth.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { sha256Hex } from '../app/utils/crypto';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  form: any;
  loading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(formGroup: any) {
    const pwd = formGroup.get('password')?.value;
    const cpwd = formGroup.get('confirmPassword')?.value;
    return pwd === cpwd ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errorMessage = null;
    this.successMessage = null;
    const data = this.form.value;
    // First check if username or email already exists (client-side UX check)
    this.loading = true;
    this.auth.getAllUsers().subscribe({
      next: (users) => {
        try {
          const uname = (data.nombre || '').toString().trim().toLowerCase();
          const email = (data.email || '').toString().trim().toLowerCase();
          const exists = users.some((u: any) => {
            const uName = (u.username || '').toString().trim().toLowerCase();
            const uEmail = (u.email || '').toString().trim().toLowerCase();
            return uName === uname || uEmail === email;
          });
          if (exists) {
            this.loading = false;
            this.errorMessage = 'El nombre de usuario o email ya existe.';
            return;
          }

          // No existe, proceder a hashear y registrar
          sha256Hex(data.password)
            .then((hash) => {
              const dto = {
                username: data.nombre,
                passwordHash: hash,
                email: data.email,
                role: 'User',
              };
              this.auth.register(dto)
                .pipe(finalize(() => (this.loading = false)))
                .subscribe({
                  next: (res) => {
                    this.successMessage = 'Registro correcto. Ahora inicia sesión.';
                    console.log('Registro response', res);
                    this.form.reset();
                    // Redirigir a login para que el usuario inicie sesión
                    this.router.navigate(['/login']);
                  },
                  error: (err) => {
                    console.error('Registro error', err);
                    // Manejo robusto de errores 400 (e.g., username/email duplicado desde backend)
                    if (err?.status === 400) {
                      const payload = err.error;
                      if (typeof payload === 'string') {
                        // mensaje directo
                        if (/already exists/i.test(payload) || /ya existe/i.test(payload)) {
                          this.errorMessage = 'El nombre de usuario o email ya existe.';
                        } else {
                          this.errorMessage = payload;
                        }
                      } else if (payload && typeof payload === 'object') {
                        // puede venir { message: '...' } o ModelState
                        if (payload.message && typeof payload.message === 'string') {
                          this.errorMessage = payload.message;
                        } else if (payload.errors) {
                          // Agregar los errores en un solo string
                          const errs = [] as string[];
                          for (const k in payload.errors) {
                            if (Array.isArray(payload.errors[k])) errs.push(...payload.errors[k]);
                            else errs.push(String(payload.errors[k]));
                          }
                          this.errorMessage = errs.join(' ');
                        } else {
                          this.errorMessage = JSON.stringify(payload);
                        }
                      } else {
                        this.errorMessage = 'No es posible registrarse: datos inválidos o ya existentes.';
                      }
                    } else {
                      this.errorMessage = err?.error || err?.message || 'Error en registro';
                    }
                  },
                });
            })
            .catch((err) => {
              this.loading = false;
              this.errorMessage = 'Error al calcular hash';
              console.error(err);
            });
        } catch (e) {
          this.loading = false;
          this.errorMessage = 'Error interno al validar usuarios existentes.';
          console.error(e);
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'No se pudo comprobar existencia de usuarios. Intenta de nuevo.';
        console.error('Error fetching users', err);
      }
    });
  }

  goBack() {
    window.history.back();
  }

}
