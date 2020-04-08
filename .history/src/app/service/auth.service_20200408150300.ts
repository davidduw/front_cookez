import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) { 

  }

  login() {
    return this.storage.set(TOKEN_KEY, 'Bearer 12345').then(res => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(res => {
      this.authenticationState.next(true);
    });
  }

  isAuthenticated()
  {

  }

  checkToken(){

  }
}
