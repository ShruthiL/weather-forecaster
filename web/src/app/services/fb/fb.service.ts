import { Injectable } from '@angular/core';
import {AngularFireLiteAuth, AngularFireLiteFirestore} from 'angularfire-lite';

@Injectable({
  providedIn: 'root'
})
export class FbService {

  constructor(private auth: AngularFireLiteAuth, private fs: AngularFireLiteFirestore) {}

  isAuth() {
    return this.auth.isAuthenticated();
  }

  signin(email, pass) {
    return this.auth.signin(email, pass);
  }

  signup(email, pass) {
    return this.auth.signup(email, pass);
  }

  userData() {
    return this.auth.userData();
  }

  signout() {
    this.auth.signout()
  }
}
