import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getAllEmployees() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any>('http://localhost:3000/employees')
  }
}
