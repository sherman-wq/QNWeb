import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationErrorComponent } from './components/authentication-error/authentication-error.component';
import { RouterModule } from '@angular/router';
import { FileSizePipe } from './pipes/file-size/file-size.pipe';




@NgModule({
  declarations: [AuthenticationErrorComponent, FileSizePipe],
  exports: [FileSizePipe],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
