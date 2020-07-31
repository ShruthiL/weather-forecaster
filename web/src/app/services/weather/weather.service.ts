import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {first, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly appID = environment.appID;

  constructor(private http: HttpClient) {
  }

  getWeather(city: string, metric: 'metric' | 'imperial' = 'imperial'): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=${this.appID}`);
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'imperial'): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(first(), map((weather) => weather['list']));
  }
}
