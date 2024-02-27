import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import { HomeComponent } from './home.component';
import { FilesModule } from '../files/files.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatListModule,
    MatStepperModule,
    FilesModule
  ]
})
export class HomeModule { }
