import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export interface RegisterDto {
  username: string;
  passwordHash: string; // backend espera PasswordHash
  email: string;
  role?: string;
}

export interface LoginDto {
  username: string;
  passwordHash: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Endpoint dockerizado de pruebas (coincide con Dockerized-Api-Users.http)
  private base = 'http://localhost:2502/api/users';
  // Estado observable del usuario actual
  private _currentUser = new BehaviorSubject<any | null>(null);
  currentUser$ = this._currentUser.asObservable();
  constructor(private http: HttpClient) {
    // Inicializar desde localStorage si existe
    try {
      const raw = localStorage.getItem('currentUser');
      if (raw) this._currentUser.next(JSON.parse(raw));
    } catch (e) {
      console.warn('AuthService: no se pudo leer currentUser desde localStorage', e);
    }
  }
  

  register(dto: RegisterDto): Observable<any> {
    return this.http.post<any>(this.base, dto);
  }

  login(dto: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.base}/login`, dto);
  }

  // Obtener todos los usuarios (usado por el frontend para checks rápidos)
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.base);
  }

  setCurrentUser(user: any | null) {
    this._currentUser.next(user);
    try {
      if (user) localStorage.setItem('currentUser', JSON.stringify(user));
      else localStorage.removeItem('currentUser');
    } catch (e) {
      console.warn('No se pudo persistir currentUser', e);
    }
  }

  logout() {
    this.setCurrentUser(null);
  }
}
