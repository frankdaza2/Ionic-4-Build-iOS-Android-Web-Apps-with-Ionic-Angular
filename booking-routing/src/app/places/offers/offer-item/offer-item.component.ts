import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../place';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {

  @Input("offer")
  offer: Place;

  constructor() { }

  ngOnInit() {}

  getDummyDate() : Date {
    return new Date();
  }
}
