import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookingState } from '../../services/booking.state';

@Component({
  selector: 'app-select-seats',
  imports: [],
  templateUrl: './select-seats.component.html',
  styleUrl: './select-seats.component.css'
})
export class SelectSeatsComponent {
  seatOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  numberOfSeats: number = 0;

  constructor(public bookingState: BookingState) { }

  @Output() closePopup = new EventEmitter<void>();

  selectSeat(seat: number): void {
    this.numberOfSeats = seat;
    this.bookingState.setNumberOfSeats(seat);
  }

  continue() {
    this.closePopup.emit();
  }

  get vehiclePreview(): { src: string; alt: string } {
    if (this.numberOfSeats <= 1) {
      return { src: 'images/cycling.png', alt: 'Cycle' };
    }
    if (this.numberOfSeats <= 2) {
      return { src: 'images/scooter.png', alt: 'Two wheeler' };
    }
    if (this.numberOfSeats <= 3) {
      return { src: 'images/rikshaw.png', alt: 'Rikshaw' };
    }
    if (this.numberOfSeats <= 5) {
      return { src: 'images/hatchback.png', alt: 'Hatchback car' };
    }
    if (this.numberOfSeats <= 7) {
      return { src: 'images/landrover.png', alt: 'Landrover car' };
    }
    if (this.numberOfSeats <= 10) {
      return { src: 'images/van.png', alt: 'Van ' };
    }
    return { src: 'images/van.png', alt: 'Large vehicle' };
  }

}
