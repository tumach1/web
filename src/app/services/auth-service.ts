import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {User} from '../shared/user';
import {Observable, tap} from 'rxjs';
import {LoginForm} from '../interfaces/login-form';
import {RegisterForm} from '../interfaces/register-form';
import {ifError} from 'node:assert';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private loginUrl = 'http://127.0.0.1:8082/auth/login';
  private logoutUrl = '/api/logout';
  private registerUrl = 'http://127.0.0.1:8082/auth/register';
  private jwtHelper = new JwtHelperService();

  private loggedInUser: User | null = null;


  constructor(private  http: HttpClient) {
  }

  loginUser(loginForm: LoginForm): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.loginUrl, loginForm, { headers }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user);
        this.initializeUserFromCookie();
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }

  logout(): Observable<any> {
    return this.http.post(this.logoutUrl, {});
  }

  private initializeUserFromCookie(): void {
    const token = this.getCookie('jwt');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken) {
        this.loggedInUser = {
          email: decodedToken.sub,
          role: decodedToken.roles[0]
        };
      }
    }
  }

  getCookie(name: string): string | null {
    let cookieValue = null;
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [cookieName, cookieVal] = cookie.split('=');
        if (cookieName.trim() === name) {
          cookieValue = cookieVal;
          break;
        }
      }
    }
    return cookieValue;
  }

  registerUser(registrationData: RegisterForm): Observable<any> {

    // const registerUrl = `/auth/register`;
    return this.http.post(this.registerUrl, registrationData, { headers: this.headers, withCredentials: true })
      .pipe(
        tap(response => {

        }, error => {

        })
      );

  }
}
