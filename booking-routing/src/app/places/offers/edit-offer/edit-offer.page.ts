import { Component, OnInit } from '@angular/core';
import { Place } from '../../place';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  place: Place;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController    
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.get('placeId')) {
        this.navCtrl.navigateBack('/places/offers');
        return;
      }

      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }
}
