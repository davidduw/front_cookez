import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'
import { environment, API_TOKEN, TOKEN_KEY, BACK_URL } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { AuthService } from '../service/auth.service';



@Component({
  selector: 'app-accueil-recette',
  templateUrl: 'accueil-recette.page.html',
  styleUrls: ['accueil-recette.page.scss']
})
export class AccueilRecettePage implements OnInit {

  types = {};
  token;
  httpOptions;

  constructor(private authService: AuthService, private storage: Storage, private router: Router, public http: HttpClient, private sanitizer: DomSanitizer) {
    
  }

  ngOnInit() { 

    /** Verification si connectée */
    this.storage.get(TOKEN_KEY).then((value) => {
      console.log(value);
      if(value != null)
      {
        this.token = value;

      /* Paramètrage du header */
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'BEARER ' + this.token
        })
      }

      /** Liste des types de recettes */
      this.getTypes();

      }else{
        this.router.navigate(['/login'])
      }
    });

    this.storage.get("userinfos").then(res => {
      console.log(res);
    });

  }

  getTypes() {
    /* Requete */
    this.http.get(BACK_URL + "/api/types", this.httpOptions)
    .subscribe(data => {
      console.log("types");
      console.log(data);
      this.types = data;
    }, error => {
      console.log(error);
      this.authService.logout();
    });
  }

  safeImage(image) {
    if (image != undefined) {
      return this.sanitizer.bypassSecurityTrustStyle('url(' + image + ')');
    }
  }

  goToTheCategoryPage(idtype) {
    let navigationExtras: NavigationExtras = {
      state: {
        idtype: idtype,
        name: "idtype"
      }
    };
    this.router.navigate(['accueil/onglets/categorie'], navigationExtras);
  }

  goToTheUserInfoPage() {
    this.router.navigateByUrl('/onglets/user-info')
  }

  logout()
  {
    this.authService.logout();
  }
}
