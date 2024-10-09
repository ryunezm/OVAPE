import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of, EMPTY, map} from "rxjs";
import { User } from "./user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User>{
    const body: {email: string, password: string} = {
      email,
      password
    };
    return this.http.post<User>(`${this.baseUrl}/login`, body);
  }

  register(first_name: string, last_name: string, email:string, selectedYear: number, semester: number, password:string): Observable<any>{
    const body = {
      first_name,
      last_name,
      email,
      selectedYear,
      semester,
      password,
    };
    return this.http.post<any>(`${this.baseUrl}/register`, body);
  }

  getJwt(): Observable<string>{
    const token = localStorage.getItem('token');
    if (token){
      return of(token);
    } else {
      return EMPTY;
    }
  }

  isJwtAvailable(): Observable<boolean>{
    return this.getJwt().pipe(map(token=>!!token));
  }
}
