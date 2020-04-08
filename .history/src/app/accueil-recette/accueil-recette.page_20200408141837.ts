import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'
import { environment, API_TOKEN, BACK_URL } from '../../environments/environment';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-accueil-recette',
  templateUrl: 'accueil-recette.page.html',
  styleUrls: ['accueil-recette.page.scss']
})
export class AccueilRecettePage implements OnInit {

  types = {};
  token;

  constructor(private storage: Storage, private router: Router, public http: HttpClient, private sanitizer: DomSanitizer) {
    
    this.getTypes();

  }

  ngOnInit() { 


  }

  getTypes() {

    /** Verification si connectée */
    this.storage.get('token').then((value) => {
      console.log(value);
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
        this.http.get(BACK_URL + "api/types", httpOptions)
        .subscribe(data => {
          this.types = data;
        }, error => {
          console.log(error);
        });
      }else{
        this.router.navigate(['/'])
      }
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
    this.router.navigate(['/onglets/categorie'], navigationExtras);
  }

  goToTheUserInfoPage() {
    this.router.navigateByUrl('/onglets/user-info')
  }
}
