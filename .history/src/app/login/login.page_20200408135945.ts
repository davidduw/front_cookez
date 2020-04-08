import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, API_TOKEN, BACK_URL } from '../../environments/environment';
import { Storage } from '@ionic/storage';

//import { AuthService } from '../auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mail;
  password;
  token = "";

  constructor(private router: Router, public http: HttpClient, private storage: Storage) { }

  ngOnInit() {

    /** Verification si déjà connectée */
    this.storage.get('token').then((value) => {
      this.token = value;
      console.log(this.token);
    });
    if( (this.token != "") && (this.token != undefined) && (this.token != null))
    {
      this.router.navigate(['/'])
    }
  }

  login(){


    if(this.mail != undefined && this.password != undefined)
    {
      /* Paramètrage du header */
      var httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      }

      let postData = {
        "email": this.mail,
        "password": this.password,
        'Authorization': ''
      }

      /* Requete */
      this.http.post(BACK_URL + "authentication_token", postData, httpOptions)
        .subscribe(data => {
          console.log(data['token']);

          // Data storage du token
          this.storage.set('token', data['token']);
          this.router.navigate(['/'])
      }, error => {
        console.log("Email ou mot de passe incorrect");
      });

    }else{
      console.log("Veuillez renseigner les champs");
    }


    //this.router.navigate(['/'])
  }

  register(){
    console.log("register");
  }

}
