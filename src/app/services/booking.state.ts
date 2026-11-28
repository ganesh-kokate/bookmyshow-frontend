import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingState {

  numberOfSeats = signal<number>(1);
  selectedSeats = signal<string[]>([]);
  showId = signal<string>("");

  setNumberOfSeats(count: number) {
    this.numberOfSeats.set(count);
  }

  decrementSeats() {
    this.numberOfSeats.update(count => count - 1);
  }

  setSelectedSeats(seats: string[]) {
    this.selectedSeats.set(seats);
  }

  setShow(show: string) {
    this.showId.set(show);
  }

  addSeat(seat: string) {
    this.selectedSeats.update(seats => [...seats, seat]);
  }

  removeSeat(seat: string) {
    this.selectedSeats.update(
      seats => seats.filter(s => s !== seat)
    );
  }

  // remainingSeats = computed(() =>
  //   this.numberOfSeats() - this.selectedSeats().length
  // );

  clearBooking(): void {
    this.selectedSeats.set([]);
    this.numberOfSeats.set(0);
  }

}
