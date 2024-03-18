import { Component, OnDestroy, OnInit } from '@angular/core';
import { QNFile, QNFileOptions, QNFileState } from './file.class';
import { FilesUploadService } from './files-upload.service';
import { BehaviorSubject, Subject, catchError, filter, finalize, from, map, mergeMap, take, takeUntil, tap } from 'rxjs';
import { handleUploadProgress } from './handlers';

@Component({
  selector: 'qn-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent implements OnDestroy, OnInit {

  private onDestroy$ = new Subject<void>();
  public onLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private filesUploadService: FilesUploadService) {
    
  }
  ngOnInit(): void {
    this.filesUploadService.getFiles().subscribe((files) => 
    {
      if(files && files.length > 0) {
        this.documents = files;
      };
      this.onLoading$.next(false);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public documents: QNFile[] = new Array;


  handleAddedFiles(items: QNFile[]) {
    
    console.log("handleAddedFiles");

    this.documents.push(...items);


    from(items).pipe(
      mergeMap((item) =>
        this.filesUploadService.uploadFile(item),

      ),
      takeUntil(this.onDestroy$)
    ).subscribe(
      (result: {type: string, file: QNFile, progress: number}) => {
        console.log(result);
        
        if(result.type === 'transfering') {
          result.file.progress = result.progress;
          result.file.state = QNFileState.Transfering;
        } 
        if(result.type === 'complete') {
          result.file.progress = result.progress;
          result.file.state = QNFileState.Success;
        }
        
      }
    );

  }

  public onActionButtonClick() {
    this.filesUploadService.startSummary().subscribe((result) => {
      console.log(result);
    })
  }
}
