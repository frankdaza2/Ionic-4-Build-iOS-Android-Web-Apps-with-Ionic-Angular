import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
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
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.get('placeId')) {
        this.navCtrl.navigateBack('/tabs/discover');
        return;
      }

      this.isLoading = true;

      this.subscription = this.placesService.getPlace(paramMap.get('placeId'))
        .subscribe(place => {
        this.place = place;
        this.isBookable = place.userId !== this.authService.userId;
        this.isLoading = false;
      }, error => {
        this.alertController.create({
          header: 'An error accurred!',
          message: 'Could not load place.',
          buttons: [{ text: 'Okay', handler: () => {
            this.router.navigate(['/tabs/discover']);
          } }]
        }).then(alertEl => alertEl.present());
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
