import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../data/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {

  private apiUrl = 'http://localhost:8082/api/booking';

  constructor(private http: HttpClient) { }

  //get Seat
  getSeatLayout(request: { showId: string }): Observable<any> {
    return this.http.request<any>(
      'POST',
      `${this.apiUrl}/getseats`,
      {
        body: request,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
