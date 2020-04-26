import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  private subscription: Subscription;
  place: Place;
  isBookable = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingController: LoadingController,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.get('placeId')) {
        this.navCtrl.navigateBack('/tabs/discover');
        return;
      }

      this.subscription = this.placesService.getPlace(paramMap.get('placeId'))
        .subscribe(place => {
        this.place = place;
        this.isBookable = place.userId !== this.authService.userId;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onBookPlace() {
    this.actionSheetCtrl.create({ 
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => { this.openBookingModal('select'); }
        },
        {
          text: 'Random Date',
          handler: () => { this.openBookingModal('random'); }
        }, 
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
     }).then(actionSheetEl => {
       actionSheetEl.present();
     });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);

    this.modalCtrl.create({ 
      component: CreateBookingComponent,
      componentProps: { selectedPlace: this.place, selectedMode: mode }
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      if (resultData.role === 'confirm') {
        this.loadingController.create({
          message: 'Booking place...'
        }).then(loadingEl => {
          loadingEl.present();

          const data = resultData.data.bookingData;
          this.bookingService.addBooking(
            this.place.id,
            this.place.title,
            this.place.imageUrl,
            data.firstName,
            data.lastName,
            data.guestNumber,
            data.startDate,
            data.endDate
          ).subscribe(() => {
            loadingEl.dismiss();
          });
        });
      }
    });
  }
}
