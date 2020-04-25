import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestOptions, Headers } from '@angular/http';
import { environment, API_TOKEN, BACK_URL } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

 // registerForm: FormGroup;
  errorinfo = "";
  confirmpass = false;

  mail = "";
  password = "";
  passwordconfirm = "";

  constructor(private router: Router, public http: HttpClient) { }

  ngOnInit() {

  }
  registerForm() {

    /* Paramètrage du header */
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : ''
      })
    }

    /** Verification mot de passe */
    if((this.mail != "") && (this.password != ""))
    {
      if((this.password == this.passwordconfirm))
      {
        this.confirmpass = true;
      }else{
        this.errorinfo = "Les mots de passes ne sont pas identiques.";
      }
    }else{
      this.errorinfo = "Veuillez renseigner les champs.";
    }

    /** Verification  formulaire */
    if(this.confirmpass == true)
    {
      /* Donées en POST */
      let postData = {
        "email": this.mail,
        "password": this.password
      }

      /* Requete */
      this.http.post(BACK_URL + "/api/register", postData, httpOptions)
        .subscribe(data => {
          this.router.navigate(['/login'])
        }, error => {
          /** Si déja inscrit avec le mail */
          if(error['error'].violations[0].title == "exist")
          {
            this.errorinfo = "Un compte existe déjà avec l'adresse mail renseignée.";
          }
      });
    }

  }
}
