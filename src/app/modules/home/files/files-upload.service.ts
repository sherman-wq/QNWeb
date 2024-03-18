import { Injectable } from '@angular/core';
import { Observable, concatMap, last, map, of, startWith, take } from 'rxjs';
import { QNFile } from './file.class';
import { ApiService } from '../../../core/services/api-service/api.service';
import { filterHttpProgress, filterHttpResponse } from '../../../core/services/api-service/utillity.api';

export type IQNFile = {
  name: string,
  size: number,
}

export type IQNFiles = IQNFile[];

@Injectable({
  providedIn: 'root'
})
export class FilesUploadService {

  constructor(
    private apiService: ApiService
    ) { }

  uploadFiles(files: QNFile[]): Observable<any> {
    const formData = new FormData();

    
    files.forEach(file => {
      formData.append('files', file.file!, file.name);
    });

    
    const request$ = this.apiService.post('uploads/files', formData, true);

    // Фильтруем события прогресса
    const progress$ = filterHttpProgress(request$);
    // Фильтруем финальный ответ
    const response$ = filterHttpResponse(request$);

  // Объединяем потоки: сначала прогресс, затем ответ
    return progress$.pipe(
      startWith(0), // Начинаем с 0% прогресса
      concatMap(progress => progress === 100 ? response$ : of(progress)),
      last(), // Убедимся, что мы получаем последнее значение (окончательный ответ)
    );

  }

  uploadFile(file: QNFile): Observable<any> {
    const formData = new FormData();
    formData.append('file', file.file!, file.name);

    console.log("uploadFile");

    
    const request$ = this.apiService.post('uploads/file', formData, true);

    // Фильтруем события прогресса
    const progress$ = filterHttpProgress(request$);
    // Фильтруем финальный ответ
    const response$ = filterHttpResponse(request$);

  // Объединяем потоки: сначала прогресс, затем ответ
    return progress$.pipe(
      startWith(0), // Начинаем с 0% прогресса
      map(progress => {
        if(progress === 100) {
          return {type: "complete", file: file, progress: progress}
        } else {
          return {type: "transfer", file: file, progress: progress}
        }
      }),
    //  concatMap(progress => progress === 100 ? response$ : of(progress)),
    );

  }

  public getFiles() {
    return this.apiService.get<IQNFiles>('uploads/getfiles').pipe(
      take(1),
      map((response) => {
        const output = [];
        for(let file of response) {
          output.push(new QNFile(file.name, file.size))
        }
        return output;
    }))
  }

  public startSummary() {
    return this.apiService.get('/summarize');
  }

}
