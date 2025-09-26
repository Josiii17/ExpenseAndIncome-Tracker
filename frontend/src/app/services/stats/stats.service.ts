import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getStats(): Observable<any> {
    return this.http.get<[]>(BASIC_URL + "api/stats");
  }

  getChart(): Observable<any> {
    return this.http.get<[]>(BASIC_URL + "api/stats/chart");
  }

}
