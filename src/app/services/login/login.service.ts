import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());

  constructor(private _http: HttpClient, private router: Router) { }

  login(data: any) {
    const url = `${environment.uri}/login`;
    return this._http.post(url, data).pipe(map((response: any) => {
      if(response?.token){
        this.setToken(response.token);
      }
      return response;
    }));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  logoutUser(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.tokenSubject.next(null);
    this.router.navigate(["/login"]);
  }

  getTokenSubject(): BehaviorSubject<string | null> {
    return this.tokenSubject;
  }
}
