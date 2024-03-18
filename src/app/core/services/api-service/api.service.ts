import { HttpClient, HttpErrorResponse, HttpRequest, HttpParams, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(route: string, params?: HttpParams | { [param: string]: string | string[]; }): Observable<T> {
    const url = `${this.URL}/${route}`; 
    return this.http.get<T>(url, { params }).pipe(
      catchError(this.handleError),
    );
  }

  post<T>(route: string, data: any, reportProgress: boolean = false): Observable<HttpEvent<T>> {
    const url = `${this.URL}/${route}`; 
    return this.http.post<T>(url, data, {
      reportProgress,
      observe: 'events',
      responseType: 'json',
    }).pipe(
      catchError(this.handleError),
    );
  }

  put<T>(route: string, data: any): Observable<T> {
    const url = `${this.URL}/${route}`; // Правильно формируем URL для запроса
    return this.http.put<T>(url, data).pipe(
      catchError(this.handleError),
    );
  }

  delete<T>(route: string): Observable<T> {
    const url = `${this.URL}/${route}`; // Правильно формируем URL для запроса
    return this.http.delete<T>(url).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Ваши стратегии обработки ошибок
    console.error('ApiService error:', error);
    return throwError(() => new Error('Произошла ошибка при выполнении запроса. Пожалуйста, попробуйте еще раз.'));
  }
}