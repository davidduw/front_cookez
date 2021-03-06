import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, API_TOKEN, BACK_URL, TOKEN_KEY } from '../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-categorie-recettes',
  templateUrl: './categorie-recettes.page.html',
  styleUrls: ['./categorie-recettes.page.scss'],
})
export class CategorieRecettesPage implements OnInit {

  parentPage: string = "accueil/onglets/accueil-recette";
  idtype: string;
  typedata = {};
  recettes = [];
  recettesFiltered = [];
  token;

  constructor(private storage: Storage, private router: Router, private activatedroute: ActivatedRoute, public http: HttpClient, private sanitizer: DomSanitizer) {
    this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idtype = this.router.getCurrentNavigation().extras.state.idtype;
        this.getRecettes(this.idtype);
      }
    });
  }

  ngOnInit() { }

  getRecettes(idtype) {

        /** Verification si connectée */
        this.storage.get(TOKEN_KEY).then((value) => {
          this.token = value;

          console.log(this.token);

          /* Paramètrage du header */
          var httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'BEARER ' + this.token
            })
          }

          /* Requete */
          this.http.get(BACK_URL + "/api/types/" + idtype, httpOptions)
          .subscribe(data => {
            this.typedata = data;
            this.recettes = this.typedata['recettes'];
            this.recettes.forEach(recette => {
              // Affichage difficulté
              switch (recette.difficulte) {
                case 1:
                  recette.difficulte = "Facile";
                  break;
                case 2:
                  recette.difficulte = "Moyen";
                  break;
                case 3:
                  recette.difficulte = "Difficile";
                  break;
                default:
                  break;
              }

              // Affichage Temps total
              const tempsTotal: number = parseInt(recette.tempsprepa, 10) + parseInt(recette.tempscuisson, 10)
              if (tempsTotal < 60) {
                recette.tempsTotal = tempsTotal + "m";
              } else {
                const heures = Math.floor(tempsTotal / 60);
                const minutes = tempsTotal % 60;
                recette.tempsTotal = heures + 'H' + minutes;
              }

              // Affichage moyenne notes
              const nbNotes = recette.notes.length;
              let sommeNotes = 0;
              recette.notes.forEach(note => {
                sommeNotes += note.etoiles;
              });
              recette.noteMoyenne = Math.round(sommeNotes / nbNotes * 10) / 10;
            });
            this.recettesFiltered = this.recettes;
          }, error => {
            console.log(error);
          });

        });
  }

  getFilteredRecettes(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.recettesFiltered = this.recettes.filter((recette) => {
        return (recette.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.recettesFiltered = this.recettes;
    }
  }

  safeImage(image) {
    if (image != undefined) {
      return this.sanitizer.bypassSecurityTrustStyle('url(' + image + ')');
    }
  }

  goToTheDetailsRecipePage(idrecette) {
    let navigationExtras: NavigationExtras = {
      state: {
        parentPage: "accueil/onglets/categorie",
        idrecette: idrecette,
        name: "idrecette"
      }
    };
    this.router.navigate(['accueil/onglets/details-recette'], navigationExtras);
  }
}
