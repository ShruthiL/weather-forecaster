import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) { }

  getData(url: string): Observable<any> {
    return this.http.get(url);
  }

  postData(url: string, body: any) {
    return this.http.post(url, body);
  }
}
