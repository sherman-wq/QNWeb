import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { PageModule } from './modules/page/page.module';
import { HomeModule } from './modules/home/home.module';
import { AboutModule } from './modules/about/about.module';
import { AuthService } from './shared/auth-service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    SharedModule,
    PageModule,
    HomeModule,
    AboutModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})  
export class AppComponent {
  
  title = 'QuickNotes';

  constructor() {
  }

}
