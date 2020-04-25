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
  token;
  userinfo;

  constructor(private storage: Storage, private plt: Platform, private router: Router, public http: HttpClient) { 
    this.plt.ready().then(()=>{
      this.checkToken();
    });
  }

  /** Connexion */
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
    this.http.post(BACK_URL + "/api/login_check", postData, httpOptions)
      .subscribe(data => {

          // On stocke le jeton
          this.token = data['token'];
          storage = this.storage.set(TOKEN_KEY, this.token).then(res => {
            this.authenticationState.next(true);
          });

          this.userInfo(this.mail);

      }, error => {
        console.log("Email ou mot de passe incorrect");
    });    

    return storage;
  }

  /** Récupère toutes les informations d'un utilisateur */
  userInfo(mail)
  {

    var user = null;

    console.log("informations utilisateur");
    
    /* Paramètrage du header */
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'BEARER ' + this.token
      })
    }

    /* Requete */
    this.http.get(BACK_URL + "/api/users", httpOptions)
    .subscribe(data => {
      for (const value in data) {
       // console.log(data[value]);

        if(data[value].email == mail)
        {
          user = data[value];
          this.storage.set("userinfos", user);
        }
      }
    }, error => {
      console.log(error);
      this.logout();
    });
  }

  /** Deconnexion */
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  /** Vérifie si conencté ou non */
  isAuthenticated()
  {
    return this.authenticationState.value;
  }

  /** Vérifie le token */
  checkToken(){
    return this.storage.get(TOKEN_KEY).then(res => {
      if(res) {
        this.authenticationState.next(true);
      }
    });
  }
}
