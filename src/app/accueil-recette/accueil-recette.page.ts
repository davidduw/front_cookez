import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'
import { environment, API_TOKEN, BACK_URL } from '../../environments/environment';



@Component({
  selector: 'app-accueil-recette',
  templateUrl: 'accueil-recette.page.html',
  styleUrls: ['accueil-recette.page.scss']
})
export class AccueilRecettePage implements OnInit {

  types = {};

  constructor(private router: Router, public http: HttpClient, private sanitizer: DomSanitizer) {
    console.log("Constructor");
  }

  ngOnInit() {
    //console.log("ngOnInit");

    /* Paramètrage du header */
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'BEARER ' + API_TOKEN
      })
    }

    /* Requete */
    this.http.get(BACK_URL + "api/types", httpOptions)
      .subscribe(data => {
        console.log(data);
        this.types = data;
      }, error => {
        console.log(error);
      });
  }

  safeImage(image) {

    return this.sanitizer.bypassSecurityTrustStyle('url(' + image + ')');
  }

  goToTheCategoryPage(idtype) {
    this.router.navigateByUrl('/onglets/categorie', { state: { idtype: idtype, name: "idtype" } });
  }

  goToTheUserInfoPage() {
    this.router.navigateByUrl('/onglets/user-info')
  }
}
