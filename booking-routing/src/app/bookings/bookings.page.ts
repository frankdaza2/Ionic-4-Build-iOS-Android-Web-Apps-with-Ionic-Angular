import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  private subscription: Subscription;
  loadedBookings: Booking[];

  constructor(private bookingService: BookingService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.subscription = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings; 
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancelBooking(bookingId: string, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.loadingController.create({ message: 'Cancelling...' }).then(loadingEl => {
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }
}
