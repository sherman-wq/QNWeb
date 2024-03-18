import { Component, Input } from '@angular/core';
import { QNFile } from '../file.class';


@Component({
  selector: 'qn-files-list',
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.scss'
})
export class FilesListComponent {

  @Input() items: QNFile[] = new Array();
  @Input() loading: boolean = false;

  //Default
  //Buffering
  //Loading
  //Error
  //Finished
  

}
