import { Component, OnInit } from '@angular/core';
import { BookingState } from '../../services/booking.state';

@Component({
  selector: 'app-payment-details',
  imports: [],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit {

  movieTitle: string = '';
  theatreName: string = '';
  showDate: string = '';
  showTime: string = '';

  selectedSeats: string[] = [];

  ticketPrice = 750;
  convenienceFee = 30;
  gst = 39;

  constructor(public bookingState: BookingState) { }

  ngOnInit(): void {
    this.movieTitle = 'avengers end game'
    this.theatreName = 'padma talkis'
    this.showDate = '01-01-2001'
    this.selectedSeats = this.bookingState.selectedSeats();
  }
  get totalAmount(): number {
    return this.ticketPrice + this.convenienceFee + this.gst;
  }

  goBack(): void {
    history.back();
  }

  makePayment(): void {
    // Integrate payment gateway here
  }
}
