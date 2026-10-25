import { Component } from '@angular/core';
import { SeatsService } from '../../services/seats.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SeatRow, Seat, SeatApiResponse } from '../../data/MovieShow';

@Component({
  selector: 'app-seat-layout',
  imports: [],
  templateUrl: './seat-layout.component.html',
  styleUrl: './seat-layout.component.css'
})
export class SeatLayoutComponent {

  showId: string;
  responce?: SeatApiResponse;
  seatRows: SeatRow[] = [];
  selectedSeats: Seat[] = [];

  constructor(private route: ActivatedRoute, private seatApiService: SeatsService, private router: Router) {
    this.showId = this.route.snapshot.paramMap.get('showId') ?? '';
  }



  ngOnInit() {

    this.seatApiService.getSeatLayout({ showId: this.showId }).subscribe
      (
        {
          next: (response) => {
            this.responce = response;
            console.log(this.responce)
            this.loadSeatLayout(response);
          }
        }
      );
  }


  loadSeatLayout(response: SeatApiResponse) {

    const grouped = new Map<string, Seat[]>();

    for (const seat of response.seats) {
      const rowName = seat.seatId.match(/^[A-Z]+/)?.[0];

      if (!rowName) {
        continue;
      }

      if (!grouped.has(rowName)) {
        grouped.set(rowName, []);
      }

      grouped.get(rowName)!.push(seat);
    }

    this.seatRows = Array.from(grouped.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([rowName, seats]) => ({
        rowName,
        price: seats[0].price,
        seats: seats.sort((a, b) => {
          const numA = Number(a.seatId.match(/\d+$/)?.[0]);
          const numB = Number(b.seatId.match(/\d+$/)?.[0]);
          return numA - numB;
        })
      }));
  }

  isSelected(seat: Seat): boolean {
    return this.selectedSeats.some(
      s => s.seatId === seat.seatId
    );
  }

  get totalPrice(): number {
    return this.selectedSeats.reduce(
      (total, seat) => total + seat.price,
      0
    );
  }

  proceedToBooking(): void {
    // Pass the selected seat IDs to your booking flow.
    console.log(
      'Selected seats:',
      this.selectedSeats.map(seat => seat.seatId)
    );
  }

}
