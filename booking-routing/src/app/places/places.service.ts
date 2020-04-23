import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://i.pinimg.com/originals/83/c6/bc/83c6bcc2981c5145965de0f2c1a395af.jpg',
      149,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p2',
      'San Francisco Apartment',
      'In the heart of California.',
      'https://static.trulia-cdn.com/pictures/thumbs_6/ps.88/d/4/2/8/picture-uh=3eee92c5cf2c3657bf837d3c3b87986-ps=d428e11a7e92dac8bf2633884f0395.jpg',
      1234.67,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p3',
      'Medellín Apartment',
      'In the heart of Antioquia Colombia.',
      'https://www.medellincolombia.co/wp-content/uploads/2018/03/Medellin-Apartment-Rental.jpg',
      1000.58,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    )
  ];

  get places() {
    return [...this._places];
  }

  constructor() { }

  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)};
  }
}
