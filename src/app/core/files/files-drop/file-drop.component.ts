import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QNFile, QNFileOptions } from '../file.class';
@Component({
  selector: 'qn-files-drop-area',
  templateUrl: './file-drop.component.html',
  styleUrl: './file-drop.component.scss'
})
export class FilesDropAreaComponent {

  @Output() onFilesAdded = new EventEmitter<QNFile[]>();

  public isDragOver$ = new BehaviorSubject<boolean>(false);

  @HostListener('window:paste', ['$event'])
  handlePaste(event: ClipboardEvent) {
    const files = event.clipboardData?.files;

    if (files && files.length > 0) {
      const output: QNFile[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
          output.push(this.convert(file));
        }
      }

      this.onFilesAdded.emit(output);
    }
  }

  onDragLeave(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.isDragOver$.next(false);
  }

  onDragEnd(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.isDragOver$.next(false);
  }

  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.isDragOver$.next(true);
  }
  
  onDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  
    if (event.dataTransfer) {
      const files = event.dataTransfer.files;

      const output = [];
      
      for(let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if(file) {
          output.push(this.convert(file));
        }
      }

      this.onFilesAdded.emit(output);
    }

    this.isDragOver$.next(false);
  }


  private convert(file: File): QNFile {

    const options: QNFileOptions = {
      lastModified: file.lastModified,
      name: file.name,
      size: file.size,
      type: file.type,
    }

    const output = new QNFile(options);
    return output;
  }
}
