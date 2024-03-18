import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, RouterOutlet } from '@angular/router';
import { PageComponent } from './page.component';
import { HomeModule } from '../home/home.module';
import { AboutModule } from '../about/about.module';
import { PricingModule } from '../pricing/pricing.module';


@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,

    HomeModule,
    AboutModule,
    PricingModule,
  ]
})
export class PageModule { }
