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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any;
  loading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errorMessage = null;
    const data = this.form.value;
    this.loading = true;
    sha256Hex(data.password)
      .then((hash) => {
        const dto = { username: data.username, passwordHash: hash };
        this.auth.login(dto)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe({
            next: (res) => {
              console.log('Login success', res);
              // Actualizar estado global del usuario
              try {
                this.auth.setCurrentUser(res);
              } catch (e) {
                console.warn('No se pudo setCurrentUser', e);
              }
              this.router.navigate(['/products']);
            },
            error: (err) => {
              console.error('Login error', err);
              if (err?.status === 401) {
                this.errorMessage = 'Usuario o contraseña incorrectos.';
                return;
              }
              this.errorMessage = err?.error || err?.message || 'Error en login';
            },
          });
      })
      .catch((err) => {
        this.loading = false;
        this.errorMessage = 'Error al calcular hash';
        console.error(err);
      });
  }

}
