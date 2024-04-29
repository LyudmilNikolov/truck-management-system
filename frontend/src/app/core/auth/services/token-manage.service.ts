import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth-data';

@Injectable({
  providedIn: 'root'
})
export class TokenManageService {

  constructor() { }

  setToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  getUsername(): string {
    const user = this.getUser();
    return user ? user.username : '';
  }

  clearStorage(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }
}
