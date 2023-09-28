import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, EMPTY } from "rxjs";
import { UserData } from "./user-data.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'auth/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    const body: {username: string, password: string} = {
      username,
      password
    };
    //body.username = username;
    //body.password = password;
    return this.http.post(`${this.baseUrl}/authenticate`, body);
  }

  register(userData: UserData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
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
