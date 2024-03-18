import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../shared/auth-service/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.getToken())
  {
    return authService.isTokenValid().pipe(
      map(isValid => {
        if (!isValid) {
          authService.clearToken(); // Очистка недействительного токена
          router.navigate(['auth-error']); // Перенаправление на страницу ошибки аутентификации
          return false;
        }
        return true; // Токен действителен, доступ к маршруту разрешен
      }),
      catchError(() => {
        router.navigate(['auth-error']); // В случае любой ошибки перенаправляем на страницу ошибки
        return of(false);
      })
    );
  }

  return authService.initAuthentication();

  
};
