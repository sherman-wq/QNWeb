import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { QNFile } from './file.class';

@Injectable({
  providedIn: 'root'
})
export class FilesUploadService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: File): Observable<QNFile> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.httpClient.post('YOUR_UPLOAD_ENDPOINT', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map(event => this.handleHttpEvent(event, file)));
  }

  private handleHttpEvent(event: HttpEvent<any>, file: File): QNFile {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return { x, progress: Math.round(100 * event.loaded / event.total!), state: 'loading' };
      case HttpEventType.Response:
        return { file, progress: 100, state: 'success' };
      default:
        return { file, progress: 0, state: 'buffering' }; // Или другая логика для начального/ошибочного состояния
    }
  }

  private adapt(data: any): QNFile  {
    
  }

}
