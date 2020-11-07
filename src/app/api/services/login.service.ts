import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginEnvio, LoginRetorno } from 'src/app/models/login.module';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
    export class LoginService {
  
    private relativeLink = 'login';
    private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private userInfo$: BehaviorSubject<LoginRetorno> = new BehaviorSubject<LoginRetorno>(null);
  
    constructor(
      private http: HttpClient,
      private router: Router
    ) { }
  
    get getIsLogged$() {
      const token = sessionStorage.getItem('token');
      if (!token) {
        this.isLoggedIn$.next(false);
      } else {
        this.isLoggedIn$.next(true);
      }
      return this.isLoggedIn$.asObservable();
    }
  
    setIsLogged$(isLogged) {
      this.isLoggedIn$.next(isLogged);
    }
  
    get getUserInformation$() {
      const user: LoginRetorno = JSON.parse(sessionStorage.getItem('user'));
      this.userInfo$.next(user);
      return this.userInfo$.asObservable();
    }
  
    setUserInformation$(user) {
      this.userInfo$.next(user);
    }
  
    logout() {
      sessionStorage.clear();
      this.isLoggedIn$.next(false);
      this.router.navigate(['']);
    }
  
  
    login(credentials: LoginEnvio): Observable<LoginRetorno> {
      return this.http.post(`${environment.api}/${this.relativeLink}`, credentials) as Observable<LoginRetorno>;
    }
  
  }