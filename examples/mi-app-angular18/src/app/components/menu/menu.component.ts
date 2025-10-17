import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenubarModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  items: MenuItem[] = [
    { label: 'Alumnos', icon: 'pi pi-users' },
    { label: 'Cursos', icon: 'pi pi-book' },
  ];
  currentUser$: Observable<any | null>;
  isAdmin$: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router) {
    this.currentUser$ = this.auth.currentUser$;
    this.isAdmin$ = this.currentUser$.pipe(
      map((u: any) => {
        if (!u) return false;
        const role = (u.role || u.Role || '').toString().toLowerCase();
        if (!role) return false;
        // Consider any role that starts with 'admin' as admin (Admin, Admin2, admin-team...)
        return role.startsWith('admin');
      })
    );
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
