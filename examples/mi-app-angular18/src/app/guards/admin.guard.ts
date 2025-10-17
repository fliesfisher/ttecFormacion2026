import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.currentUser$.pipe(
      take(1),
      map((user: any) => {
        if (user && (user.role === 'Admin' || (user.roles && Array.isArray(user.roles) && user.roles.includes('Admin')))) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
