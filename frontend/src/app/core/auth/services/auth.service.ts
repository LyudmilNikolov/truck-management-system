import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ROUTE_PATHS } from '../../../shared/constants/route-paths.constants';
import { Credentials } from '../../../shared/interfaces/credentials';
import { AuthResponse } from '../interfaces/auth-data';
import { TokenManageService } from './token-manage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router: Router, private tokenManageService: TokenManageService) {}

  login(credentials: Credentials): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, credentials).pipe(
      tap(res => this.handleAuthentication(res)),
      map(res => !!res),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.tokenManageService.clearStorage();
    this.navigateToLogin();
  }

  isLoggedIn(): boolean {
    const user = this.tokenManageService.getUser();
    return !!user && !!this.tokenManageService.getToken();
  }

  private handleAuthentication(res: AuthResponse): void {
    this.tokenManageService.setToken(res.accessToken);
    this.tokenManageService.setUser(res.user);
    // exportTokenInfo here we will load all the access for the user 
    // TODO: Add Admin user and normal user 
  }

  private navigateToLogin(): void {
    this.router.navigate([ROUTE_PATHS.LOGIN]);
  }
}