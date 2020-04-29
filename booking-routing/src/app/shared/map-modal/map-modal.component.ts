import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapElementRef: ElementRef;

  constructor(private modalController: ModalController, private renderer: Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10
      });

      googleMaps.event.addListenerOnce(map, 'idle', () => {
        this.renderer.addClass(mapEl, 'visible');
      });

      map.addListener('click', event => {
        const selectCoords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        this.modalController.dismiss(selectCoords);
      });
    }).catch(error => {
      console.log(error);
    });
  }

  onCancel() {
    this.modalController.dismiss();
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;

    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCfe4hdMmqynYKzTUVxHg2yaYrFLQDuPQk';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }
}
