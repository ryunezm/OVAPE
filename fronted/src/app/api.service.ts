import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '';

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    const body: {username: string, password: string} = {
      username: '',
      password: ''
    };
    body.username = username;
    body.password = password;
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }
}
