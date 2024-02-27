import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/auth-service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    CoreModule,
    SharedModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  title = 'QuickNotes';
  errorMessage: string = '';
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getFingerprint().then(fingerprint => {
      this.authService.authenticate(fingerprint).subscribe({
        next: (response) => {
          this.isAuthenticated = true;
        },
        error: (error) => {
          this.isAuthenticated = false;
          console.log(error);
          this.errorMessage = 'Could not authenticate you!\n';
        }
      });
    });
  }

  async getFingerprint(): Promise<string> {
    // Здесь должен быть ваш код для получения отпечатка устройства
    return 'some-fingerprint'; // Примерный возврат
  }
}
