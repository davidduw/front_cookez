import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, API_TOKEN, BACK_URL } from '../../environments/environment';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform, private router: Router, public http: HttpClient) { 
    this.plt.ready().then(()=>{
      this.checkToken();
    });
  }

  login(data) {
    var storage = null;
    /* Paramètrage du header */
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    let postData = {
      'email': data.mail,
      'password': data.password,
      'Authorization': ''
    }

    /* Requete */
    this.http.post(BACK_URL + "authentication_token", postData, httpOptions)
      .subscribe(data => {
          console.log(data['token']);

          // Data storage du token
          storage = this.storage.set(TOKEN_KEY, data['token']).then(res => {
            this.authenticationState.next(true);
          });
      }, error => {
        console.log("Email ou mot de passe incorrect");
    });    

    return storage;
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated()
  {
    //return "test";
    return this.authenticationState.value;
  }

  checkToken(){
    return this.storage.get(TOKEN_KEY).then(res => {
      if(res) {
        this.authenticationState.next(true);
      }
    });
  }
}
