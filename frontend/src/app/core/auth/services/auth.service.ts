import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ROUTE_PATHS } from '../../../shared/constants/route-paths.constants';
import { Credentials } from '../../../shared/interfaces/credentials';

interface AuthResponse {
  accessToken: string;
  user: {
    username: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: Credentials): Observable<boolean> {
    console.log(`${this.authUrl}/login`, credentials);
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, credentials).pipe(
      tap(res => this.handleAuthentication(res)),
      map(res => !!res),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.clearUserFromStorage();
    this.navigateToLogin();
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return !!user && !!this.getToken();
  }

  getCurrentUserId(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user && user.sub;
  }

  private handleAuthentication(res: AuthResponse): void {
    localStorage.setItem('accessToken', res.accessToken);
    this.setUserToStorage(res.user);
    // exportTokenInfo here we will load all the access for the user 
    // TODO: Add Admin user and normal user 
  }

  private navigateToLogin(): void {
    this.router.navigate([ROUTE_PATHS.LOGIN]);
  }

  private clearUserFromStorage(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  }

  private setUserToStorage(user: Record<string, string>): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}