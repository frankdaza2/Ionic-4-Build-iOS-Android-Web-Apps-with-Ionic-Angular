import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

    text = 'The world is your oyster.';

    onChangeText() {
      this.text = 'Changed!';
    }
}
