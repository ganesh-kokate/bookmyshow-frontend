import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingRequest } from '../data/MovieShow';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  private apiUrl = 'http://localhost:8082/api/booking';


  constructor(private http: HttpClient) { }

  createBooking(request: BookingRequest): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/bookseats`, request);
  }
}
