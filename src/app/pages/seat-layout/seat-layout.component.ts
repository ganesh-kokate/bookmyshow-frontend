import { Component, OnDestroy } from '@angular/core';
import { SeatsService } from '../../services/seats.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SeatRow, Seat, SeatApiResponse, BookingRequest } from '../../data/MovieShow';
import { SelectSeatsComponent } from '../../components/select-seats/select-seats.component';
import { BookingState } from '../../services/booking.state';
import { BookingServiceService } from '../../services/booking-service.service';

@Component({
  selector: 'app-seat-layout',
  imports: [SelectSeatsComponent],
  templateUrl: './seat-layout.component.html',
  styleUrl: './seat-layout.component.css'
})
export class SeatLayoutComponent {

  showId: string;
  responce?: SeatApiResponse;
  seatRows: SeatRow[] = [];
  showSeatPopup = true;
  selectedSeats: string[] = [];
  showID: string = "";
  bookingId: string = "";


  constructor(private route: ActivatedRoute, private seatApiService: SeatsService, private router: Router, public bookingState: BookingState, private bookingservice: BookingServiceService) {
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
    return this.selectedSeats.includes(seat.seatId);
  }

  selectSeat(seat: string): void {
    if (this.selectedSeats.includes(seat)) {
      this.bookingState.removeSeat(seat);
      return;
    }

    if (this.bookingState.numberOfSeats() <= 0) {
      return;
    }

    this.bookingState.addSeat(seat);
    this.bookingState.decrementSeats();
    this.selectedSeats = this.bookingState.selectedSeats();
  }

  closePopup(): void {
    console.log("close popup");
    this.showSeatPopup = false;
  }

  // ngOnDestroy(): void {
  //   this.bookingState.clearBooking();
  // }

  continueToPayment(): void {

    const request: BookingRequest = {
      userId: 'USER001',
      lockSeatsRequest: {
        seatIds: this.bookingState.selectedSeats(),
        showId: this.bookingState.showId()
      }
    };

    console.log(request)

    this.bookingservice.createBooking(request).subscribe({
      next: (response) => {
        console.log('Booking successful:', response);
        this.bookingId = response || '';
        this.router.navigate(['/payments']);
      },
      error: (error) => {
        console.error('Booking failed:', error);
      }
    });
    this.router.navigate(['/payments']);
  }

}
