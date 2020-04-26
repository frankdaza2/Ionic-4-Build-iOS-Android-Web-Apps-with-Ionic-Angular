import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places = new BehaviorSubject<Place[]>(
    [
      new Place(
        'p1',
        'Manhattan Mansion',
        'In the heart of New York City.',
        'https://i.pinimg.com/originals/83/c6/bc/83c6bcc2981c5145965de0f2c1a395af.jpg',
        149,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'xyz'
      ),
      new Place(
        'p2',
        'San Francisco Apartment',
        'In the heart of California.',
        'https://static.trulia-cdn.com/pictures/thumbs_6/ps.88/d/4/2/8/picture-uh=3eee92c5cf2c3657bf837d3c3b87986-ps=d428e11a7e92dac8bf2633884f0395.jpg',
        1234.67,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'abc'
      ),
      new Place(
        'p3',
        'Medellín Apartment',
        'In the heart of Antioquia Colombia.',
        'https://www.medellincolombia.co/wp-content/uploads/2018/03/Medellin-Apartment-Rental.jpg',
        1000.58,
        new Date('2019-01-01'),
        new Date('2019-12-31'),
        'abc'
      )
    ]
  );

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  getPlace(id: string) {
    return this.places.pipe(take(1), map(places => {
      return { ...places.find(p => p.id === id) };
    }));
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://www.medellincolombia.co/wp-content/uploads/2018/03/Medellin-Apartment-Rental.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );

    return this.httpClient.post('https://ionic-angular-course-knarf.firebaseio.com/offered-places.json', {
      ...newPlace, id: null
    }).pipe(tap(response => {
      console.log(response);
    }));

    // return this.places.pipe(take(1), delay(1000), tap(places => {
    //   this._places.next(places.concat(newPlace));
    // }));
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      }));
  }
}
