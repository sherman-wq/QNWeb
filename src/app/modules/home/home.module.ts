import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { FilesModule } from './files/files.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [
    FilesModule,
    SharedModule,
  ],
  
})
export class HomeModule { }
