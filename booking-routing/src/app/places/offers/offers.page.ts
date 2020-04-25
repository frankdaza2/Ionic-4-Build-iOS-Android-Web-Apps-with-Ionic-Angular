import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  private subscription: Subscription;
  offers: Place[];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.subscription = this.placesService.places.subscribe(places => {
      this.offers = places;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
