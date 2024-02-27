import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FilesDropAreaComponent } from './files-drop/file-drop.component';
import { FilesListComponent } from './files-list/file-list.component';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FilesComponent } from './files.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar'


@NgModule({
  declarations: [FilesComponent, FilesDropAreaComponent, FilesListComponent],
  exports: [FilesComponent],
  imports: [
    CommonModule,
    FilesRoutingModule,
    MatListModule,
    DragDropModule,
    MatIconModule,
    MatProgressBarModule
  ]
})
export class FilesModule { }
