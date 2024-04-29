import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../core/auth/services/auth.service';
import { TokenManageService } from '../../core/auth/services/token-manage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private tokenManageService = inject(TokenManageService);

  public user = this.tokenManageService.getUsername();

  logout(): void {
    this.authService.logout();
  }
}