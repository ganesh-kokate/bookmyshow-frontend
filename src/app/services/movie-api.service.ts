import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../data/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  private apiUrl = 'http://localhost:8081/api/movie';

  constructor(private http: HttpClient) { }

  // Movie Card 
  // TODO : replace api and fetch details required only for cards 
  getMovies(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/getAllMovies`
    );
  }

  //movie Details
  getMovieById(id: number): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/${id}`
    );
  }

  //movie shows
  getShowsByMovieTitle(title: string): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.apiUrl}/get/${encodeURIComponent(title)}`
    );
  }
}
