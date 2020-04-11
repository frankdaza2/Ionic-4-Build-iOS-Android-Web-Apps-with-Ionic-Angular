import { Injectable } from '@angular/core';
import { Place } from './place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://www.google.com/search?q=manhattan+apartment&tbm=isch&ved=2ahUKEwiY8MrjmeHoAhWARDABHcbnAC0Q2-cCegQIABAA&oq=manhattan+apartment&gs_lcp=CgNpbWcQAzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAA6BAgAEENQ1xBYtCxg_y1oAHAAeACAAcwBiAHsCpIBBTAuOS4xmAEAoAEBqgELZ3dzLXdpei1pbWc&sclient=img&ei=DieSXpixFYCJwbkPxs-D6AI&bih=657&biw=1360&rlz=1C1GCEB_enCO889CO889#imgrc=tkvsXgHTUF0KmM',
      149
    ),
    new Place(
      'p2',
      'San Francisco Apartment',
      'In the heart of California.',
      'https://www.google.com/search?q=san+francisco+apartments+for+sale&rlz=1C1GCEB_enCO889CO889&source=lnms&tbm=isch&sa=X&ved=2ahUKEwilzo_6meHoAhXMhOAKHUw7ALQQ_AUoAXoECBMQAw&biw=1360&bih=657#imgrc=br5yE2mukI7kjM',
      1234.67
    ),
    new Place(
      'p3',
      'Medellín Apartment',
      'In the heart of Antioquia Colombia.',
      'https://www.google.com/search?q=medellin+apartment&tbm=isch&ved=2ahUKEwj3tfb6meHoAhVktTEKHYREBkUQ2-cCegQIABAA&oq=medellin+apartment&gs_lcp=CgNpbWcQAzICCAAyAggAMgYIABAIEB4yBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBg6BAgAEEM6BAgAEB46BggAEAUQHlCVmwRYvq4EYMevBGgBcAB4AIABkAGIAewSkgEEMC4xOZgBAKABAaoBC2d3cy13aXotaW1n&sclient=img&ei=PyeSXreaEuTqxgGEiZmoBA&bih=657&biw=1360&rlz=1C1GCEB_enCO889CO889#imgrc=DiJxrX1uz__MHM',
      1000.58
    )
  ];

  get places() {
    return [...this._places];
  }

  constructor() { }
}
