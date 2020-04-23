import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, API_TOKEN, BACK_URL } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { AuthService } from '../service/auth.service';

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

  constructor(private authService: AuthService, private router: Router, public http: HttpClient, private storage: Storage) { }

  ngOnInit() {
    /** Verification si déjà connectée */
    this.storage.get('token').then((value) => {
      this.token = value;
    });
    if( (this.token != "") && (this.token != undefined) && (this.token != null))
    {
      this.router.navigate(['/'])
    }
  }

  login(){
    var data = {};

    if(this.mail != undefined && this.password != undefined)
    {
      data['mail'] = this.mail;
      data['password'] = this.password;
  
      this.authService.login(data);

    }else{
      console.log("Veuillez renseigner les champs");
    }
  }

  register(){
    console.log("register");
  }


    userInfo(mail)
  {
    console.log("informations utilisateur");

    /** Verification si connectée */
    this.storage.get(TOKEN_KEY).then((value) => {
      if(value != null)
      {
        this.token = value;
        /* Paramètrage du header */
        var httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'BEARER ' + this.token
          })
        }

        /* Requete */
        this.http.get(BACK_URL + "api/users", httpOptions)
        .subscribe(data => {
          console.log(data);

        }, error => {
          console.log(error);
          this.logout();
        });

      }else{
        this.router.navigate(['/login'])
      }
    });
  }


}
