import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, API_TOKEN, TOKEN_KEY, BACK_URL } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authenticationState = new BehaviorSubject(false);
  mail;

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

    this.mail = data.mail;

    let postData = {
      'email': this.mail,
      'password': data.password,
      'Authorization': ''
    }

    /* Requete */
    this.http.post(BACK_URL + "api/login_check", postData, httpOptions)
      .subscribe(data => {
          // Data storage du token
          storage = this.storage.set(TOKEN_KEY, data['token']).then(res => {
            this.authenticationState.next(true);
          });

          /** Informations de l'utilisateur  */
          this.userInfo(this.mail);
          
      }, error => {
        console.log("Email ou mot de passe incorrect");
    });    

    return storage;
  }

  userInfo(mail)
  {

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }

    /* Requete */
    this.http.get(BACK_URL + "api/users", httpOptions)
    .subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
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
