import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { HomeModule } from './home/home.module';
import { FilesModule } from './files/files.module';

@NgModule({
  declarations: [PricingComponent, AboutComponent],
  imports: [
    HomeModule,
    CommonModule,
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    MatIconModule,
    FilesModule
  ]
})
export class CoreModule { }
