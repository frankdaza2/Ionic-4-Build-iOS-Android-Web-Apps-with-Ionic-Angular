import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';


interface PlaceData {
  availableFrom: string,
  availableTo: string,
  description: string,
  imageUrl: string,
  price: number,
  title: string,
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places = new BehaviorSubject<Place[]>([]);

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
    let generatedId: string;
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

    return this.httpClient.post<{ name: string }>('https://ionic-angular-course-knarf.firebaseio.com/offered-places.json', {
      ...newPlace, id: null
    }).pipe(switchMap(response => {
      generatedId = response.name;  
      return this.places;
    }),
    take(1),
    tap(places => {
      newPlace.id = generatedId;
      this._places.next(places.concat(newPlace));
    }));
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

  fetchPlaces() {
    return this.httpClient.get<{ [key: string]: PlaceData }>('https://ionic-angular-course-knarf.firebaseio.com/offered-places.json')
      .pipe(map(response => {
        const places = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            places.push(new Place(
              key,
              response[key].title,
              response[key].description,
              response[key].imageUrl,
              response[key].price,
              new Date(response[key].availableFrom),
              new Date(response[key].availableTo),
              response[key].userId
            ));
          }
        }
        return places;
      }),
      tap(places => {
        this._places.next(places);
      }));
  }
}
