import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { BehaviorSubject, Observable, catchError, concatMap, from, map, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private fingerprint: string | null = null;


  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) { 
  }

  
  //private token: string | null = null;

  public clearToken(): void {
    sessionStorage.removeItem('authToken'); // Используем sessionStorage для повышения безопасности
  }

  public getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  private setToken(token: string): void {
    sessionStorage.setItem('authToken', token); // Сохраняем токен в sessionStorage
  }


  initAuthentication(): Observable<boolean> {
    
    const fingerprint$ = from(this.generateFingerprint());

    const authenticate$ = (fingerprint: string) => this.authenticate(fingerprint).pipe(
      catchError(() => {
        // Очистка токена при любых ошибках связи с сервером или ошибке аутентификации
        this.clearToken();
        this._isAuthenticated$.next(false);
        this.router.navigate(['/auth-error']); // Перенаправление на страницу ошибки
        return of(false);
      })
    );

    const result$ = fingerprint$.pipe(concatMap(result => authenticate$(result)));
    return result$;
    
  }

  authenticate(fingerprint: string): Observable<boolean> {

    const signature = sha256(fingerprint + environment.client_key);

    return this.http.post<{token: string}>(`${this.apiUrl}/authenticate`, { fingerprint, signature })
      .pipe(
        map(response => {
          this.setToken(response.token); // Сохраняем токен
          this._isAuthenticated$.next(true);
          return true;
        }),
        catchError(error => {
          console.error('Authentication error:', error.message);
          this._isAuthenticated$.next(false);
          return throwError(() => new Error('Authentication failed'));
        })
      );
  }

  authorize(fingerprint: string, username: string): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/authorize`, { fingerprint, username })
      .pipe(
        map(() => true),
        catchError(error => {
          console.error(error);
          return throwError(() => new Error(error));
        })
      );
  }

  isTokenValid(): Observable<boolean> {
    const token = this.getToken(); // Предполагается, что метод getToken() возвращает текущий токен
    if (!token) {
      return of(false); // Если токена нет, сразу возвращаем false
    }
    
    return this.http.post<{ isValid: boolean }>(`${this.apiUrl}/verify-token`, { token })
      .pipe(
        map(response => response.isValid),
        catchError(() => of(false)) // В случае ошибки считаем токен недействительным
      );
  }

  private async generateFingerprint(): Promise<string> {
    if(!this.fingerprint) {
      await this.initFingerprint();
    }
    return this.fingerprint!;
    
  }

  private async initFingerprint() {
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    this.fingerprint = visitorId;
  }
}
