import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  postIncome(incomeDTO: any): Observable<any> {
    return this.http.post<[]>(BASIC_URL + "api/income", incomeDTO);
  }

  getAllIncomes(): Observable<any> {
    return this.http.get<[]>(BASIC_URL + "api/income/all");
  }

  getIncomeById(id: number): Observable<any> {
    return this.http.get<[]>(BASIC_URL + `api/income/${id}`);
  }

  updateIncome(id: number, incomeDTO: any): Observable<any> {
    return this.http.put<[]>(BASIC_URL + `api/income/${id}`, incomeDTO);
  }

  deleteIncome(id: number): Observable<any> {
    return this.http.delete<[]>(BASIC_URL + `api/income/${id}`);
  }

}
