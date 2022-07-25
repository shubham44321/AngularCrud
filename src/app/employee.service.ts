import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { Result } from './result';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = "http://localhost:56806/";

  constructor(private http: HttpClient) { }

  getAllEmployeeDetails(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'api/EmployeeApi/GetAllEmployeeDetails');
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + 'api/EmployeeApi/Details/'+id);
  }

  createEmployee(employee: Employee): Observable<Result> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Result>(this.baseUrl + 'api/EmployeeApi/Create',
      employee, httpOptions);
  }

  editEmployee(employee: Employee): Observable<Result> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Result>(this.baseUrl + 'api/EmployeeApi/Edit',
      employee, httpOptions);
  }

  deleteEmployeeById(id: number): Observable<Result> {
    return this.http.delete<Result>(this.baseUrl + 'api/EmployeeApi/Delete/' + id);
  }
}
