import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { Observable, filter, map } from "rxjs";

export function filterHttpResponse<T>(source: Observable<HttpEvent<T>>): Observable<T> {
    return source.pipe(
        filter(event => event.type === HttpEventType.Response),
        map(event => (event as HttpResponse<T>).body!)
    );
}
  
export function filterHttpProgress(source: Observable<HttpEvent<any>>): Observable<number> {
    return source.pipe(
        filter(event => event.type === HttpEventType.UploadProgress || event.type === HttpEventType.DownloadProgress),
        map(event => {
        if (event.type === HttpEventType.UploadProgress || event.type === HttpEventType.DownloadProgress) {
            return Math.round((event.loaded / (event.total || 1)) * 100);
        }
        return 0;
        })
    );
}