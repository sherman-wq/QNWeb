import { Routes } from '@angular/router';
import { AboutComponent } from './modules/about/about.component';
import { HomeComponent } from './modules/home/home.component';
import { PricingComponent } from './modules/pricing/pricing.component';
import { PageComponent } from './modules/page/page.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { AuthenticationErrorComponent } from './shared/components/authentication-error/authentication-error.component';

export const routes: Routes = [
    { 
        path: '', 
        component: PageComponent,   
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'features', component: AboutComponent },
            { path: 'pricing', component: PricingComponent },
            { path: 'about', component: AboutComponent }
        ]
      },
      { path: 'auth-error', component: AuthenticationErrorComponent },
      { path: '**', redirectTo: '' } // Redirect any unknown paths to home
];
