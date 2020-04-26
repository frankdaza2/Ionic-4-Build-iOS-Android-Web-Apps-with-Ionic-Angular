import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAuthenticate = false;
  private _userId = 'xyz';

  constructor() { }

  login() {
    this._userIsAuthenticate = true;
  }

  logout() {
    this._userIsAuthenticate = false;
  }

  get userIsAuthenticate() {
    return this._userIsAuthenticate;
  }

  get userId() {
    return this._userId;
  }
}
