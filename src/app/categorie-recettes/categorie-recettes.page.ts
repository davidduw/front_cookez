import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute  } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, API_TOKEN } from '../../environments/environment';



@Component({
  selector: 'app-categorie-recettes',
  templateUrl: './categorie-recettes.page.html',
  styleUrls: ['./categorie-recettes.page.scss'],
})
export class CategorieRecettesPage implements OnInit {

  parentPage: string = "onglets/accueil-recette";
  idtype = "";
  sub;
  typedata = {};
  recettes = [];

  constructor(private router: Router, private Activatedroute:ActivatedRoute, public http: HttpClient) { 

    //this.idtype = this.router.getCurrentNavigation().extras.state['idtype'];
    //console.log(this.idtype);
    
  }

  ngOnInit() {

    this.sub=this.Activatedroute.paramMap.subscribe(params => { 
      console.log(params);
       this.idtype = params.get('idtype'); 
    });

    if(this.idtype != "0"){
      
      /* Paramètrage du header */
      var httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization' : 'BEARER '+ API_TOKEN
        })
      }

      /* Requete */
      this.http.get("http://localhost:8000/api/types/"+this.idtype, httpOptions)
      .subscribe(data => {
        
        this.typedata = data;
        this.recettes = this.typedata['recettes'];
        console.log(this.recettes);
      }, error => {
        console.log(error);
      });
    }
  }

  goToTheDetailsRecipePage() {
    let navigationExtras: NavigationExtras = {
      state: {
        page: "onglets/categorie"
      }
    };
    this.router.navigate(['onglets/details-recette'], navigationExtras)
  }
}
