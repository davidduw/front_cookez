import { API_TOKEN, BACK_URL } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http } from '@angular/http';
import { ModalDetailRecipePage } from './../modal-detail-recipe/modal-detail-recipe.page';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-details-recette',
  templateUrl: 'details-recette.page.html',
  styleUrls: ['details-recette.page.scss']
})
export class DetailsRecettePage implements OnInit {

  information: any[];
  parentPage: string;
  // parentPage: string = "onglets/accueil-recette";
  idrecette = "";
  sub;
  typedata = {};
  recettes = [];

  nom;
  difficulte;
  preparation;
  cuisson;
  tempsTotal;
  nbrPersonnes;
  ingredients;
  etapesPreparation;
  etapesCuisson;
  quantites;
  etiquettes;


  constructor(private Activatedroute: ActivatedRoute,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private modalController: ModalController,
    private navCtrl: NavController,
    public http: HttpClient) {

    this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idrecette = this.router.getCurrentNavigation().extras.state.idrecette;
        this.getRecette(this.idrecette);
      }
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalDetailRecipePage,
      componentProps: { 
        titre: this.nom,
        idrecette: this.idrecette
      }
    });
    return await modal.present();
  }

  isShowIngr = true;
  isShowPrepa = false;
  isShowCuisson = false;

  toggleDisplay($params) {
    switch ($params) {
      case 'ingredients':
        this.isShowIngr = !this.isShowIngr;
        break;

      case 'preparation':
        this.isShowPrepa = !this.isShowPrepa;
        break;

      case 'cuisson':
        this.isShowCuisson = !this.isShowCuisson;
        break;

      default:
        break;
    }
  }

  ngOnInit() { }

  getRecette(idrecette: string) {
    if (idrecette != "0") {

      /* Paramètrage du header */
      var httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'BEARER ' + API_TOKEN
        })
      }

      /* Affichage recette sélectionnée */
      this.http.get(BACK_URL + "api/recettes/" + idrecette, httpOptions)
        .subscribe(data => {

          // titre de la recette
          this.nom = data['nom'];

          // difficulté de la recette
          this.difficulte = data['difficulte'];
          switch (this.difficulte) {
            case 1:
              this.difficulte = "Facile";
              break;
            case 2:
              this.difficulte = "Moyen";
              break;
            case 3:
              this.difficulte = "Difficile";
              break;
          }
          // temps total
          this.preparation = data['tempsprepa'];
          this.cuisson = data['tempscuisson'];
          this.tempsTotal = parseInt(this.preparation) + parseInt(this.cuisson) + "min";

          // nombre de personnes
          this.nbrPersonnes = data['nbrPersonnes'] + " pers.";

          // étiquettes
          this.etiquettes = data['etiquettes'];

          //ingrédients de la recette
          this.quantites = data['quantites'];

          // étapes de préparation
          this.etapesPreparation = data['preparations'].sort((a,b)=> a.numEtape-b.numEtape);

          // étapes de cuisson
          this.etapesCuisson = data['cuissons'].sort((a,b)=> a.numEtape-b.numEtape);

        }, error => {
          console.log(error);
        });


      // this.http.get("http://localhost:8000/api/types/"+this.idtype, httpOptions)
      // this.http.get("http://localhost:3200/api/etapes", httpOptions)
      // .subscribe(data => {
      //   this.etapes = data;
      //   this.etapes.forEach(etape => {
      //     const recetteEtape = etape['recette']['id']; 
      //   });
      // }, error => {
      //   console.log(error);
      // });
    }
  }
}
