import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { Place } from '../../place';

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
    });
  }

}
