import { API_TOKEN } from './../../environments/environment';
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
export class DetailsRecettePage implements OnInit{

  information: any [];
  parentPage: string;
  // parentPage: string = "onglets/accueil-recette";
  idtype = "";
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
    private modalController: ModalController,
    // private http: Http,
    private navCtrl: NavController, 
    public http: HttpClient) {

    // this.router.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.parentPage = this.router.getCurrentNavigation().extras.state.page;
    //   }
    // });

    // let localData = this.http.get('assets/information.json').map(res => res.json().items);
    // localData.subscribe(data => {
    //   this.information = data;
    // });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalDetailRecipePage,
    });
    modal.present();
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
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
        this.isShowCuisson= !this.isShowCuisson;
        break;  
      
      default:
        break;
    }
    
  }

  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  ngOnInit() {
    // this.nom = "poulet";
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

      /* Affichage recette sélectionnée */

      // this.http.get("http://localhost:8000/api/types/"+this.idtype, httpOptions)
      this.http.get("http://localhost:3200/api/recettes/1", httpOptions)
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
        this.etiquettes = data ['etiquettes'];

        //ingrédients de la recette
        this.quantites = data['quantites'];

        // étapes de préparation
        this.etapesPreparation = data['preparations'];

         // étapes de cuisson
         this.etapesCuisson = data['cuissons'];

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
