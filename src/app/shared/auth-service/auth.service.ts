import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { 

  }

  authenticate(fingerprint: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, { fingerprint });
  }

  authorize(fingerprint: string, username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/authorize`, { fingerprint, username });
  }
}
