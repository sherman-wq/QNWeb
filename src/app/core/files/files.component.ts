import { Component } from '@angular/core';
import { QNFile } from './file.class';

@Component({
  selector: 'qn-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent {

  public documents: QNFile[] = new Array();

  handleAddedFiles(items: QNFile[]) {
    this.documents.push(...items);
  }
}
