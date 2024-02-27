import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PricingComponent } from './core/pricing/pricing.component';
import { AboutComponent } from './core/about/about.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'features', component: AboutComponent},
    { path: 'pricing', component: PricingComponent},
    { path: 'about', component: AboutComponent},
    { path: '**', component: HomeComponent}
];
