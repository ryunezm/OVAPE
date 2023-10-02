import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, EMPTY } from "rxjs";
import { User } from "./user.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User>{
    const body: {username: string, password: string} = {
      username,
      password
    };
    return this.http.post<User>(`${this.baseUrl}/authenticate`, body);
  }

  register(first_name: string, last_name: string, email:string, password:string): Observable<any>{
    const body = {
      first_name,
      last_name,
      email,
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
}
