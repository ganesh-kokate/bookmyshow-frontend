import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddShowRequest } from '../data/MovieShow';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8084/admin';

  constructor(private http: HttpClient) { }

  getScreens(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/getscreens`);
  }

  getMovies(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/getmovies`);
  }

  addShow(request: AddShowRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, request);
  }
}
