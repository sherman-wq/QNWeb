import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesDropAreaComponent } from './files-drop/file-drop.component';
import { FilesListComponent } from './files-list/file-list.component';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FilesComponent } from './files.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { SharedModule } from '../../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [FilesComponent, FilesDropAreaComponent, FilesListComponent],
  exports: [FilesComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    SharedModule,
    MatListModule,
    DragDropModule,
    MatIconModule,
    MatProgressBarModule
  ]
})
export class FilesModule { }
