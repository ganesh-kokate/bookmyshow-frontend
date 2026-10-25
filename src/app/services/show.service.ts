import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieShowsDTO } from '../data/MovieShow';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private apiUrl = 'http://localhost:8081/api/show';

  constructor(private http: HttpClient) { }

  getShowsForMovie(id: number): Observable<MovieShowsDTO[]> {
    return this.http.get<MovieShowsDTO[]>(
      `${this.apiUrl}/movies/${encodeURIComponent(id)}`
    );
  }
}
