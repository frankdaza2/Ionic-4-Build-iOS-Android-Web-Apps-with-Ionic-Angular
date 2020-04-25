import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  private subscription: Subscription;
  loadedBookings: Booking[];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.subscription = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings; 
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancelBooking(offerId: string, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
  }
}
