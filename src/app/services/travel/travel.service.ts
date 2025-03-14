import { Injectable } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(private _http: HttpClient, private router: Router) { }

  getCountries() {
    const url = `${environment.uri}/countries`;
    return this._http.get(url).pipe(map((response: any) => {
      return response;
    }));
  }

  getCitiesByCountry(idCountry:number) {
    const url = `${environment.uri}/cities/${idCountry}`;
    return this._http.get(url).pipe(map((response: any) => {
      return response;
    }));
  }

  getWeather(city:string) {
    const url = `${environment.uri}/weather/${city}`;
    return this._http.get(url).pipe(map((response: any) => {
      return response;
    }));
  }

  getHistory() {
    const url = `${environment.uri}/history`;
    return this._http.get(url).pipe(map((response: any) => {
      return response;
    }));
  }

  convertCurrency(data: any) {
    const url = `${environment.uri}/convert-currency`;
    return this._http.post(url, data).pipe(map((response: any) => {
      return response;
    }));
  }

  storeHistory(data: any) {
    const url = `${environment.uri}/history`;
    return this._http.post(url, data).pipe(map((response: any) => {
      return response;
    }));
  }
}
