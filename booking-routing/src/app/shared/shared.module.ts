import { NgModule } from "@angular/core";
import { LocationPickerComponent } from "./pickers/location-picker/location-picker.component";
import { MapModalComponent } from "./map-modal/map-modal.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [LocationPickerComponent, MapModalComponent],
    entryComponents: [MapModalComponent],
    imports: [CommonModule],
    exports: [LocationPickerComponent, MapModalComponent]
})
export class SharedModule {

}