import { API_TOKEN, BACK_URL } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-modal-detail-recipe',
  templateUrl: './modal-detail-recipe.page.html',
  styleUrls: ['./modal-detail-recipe.page.scss'],
})
export class ModalDetailRecipePage implements OnInit {
  information: any [];
  parentPage: string;
  // parentPage: string = "onglets/accueil-recette";
  idrecette = "";
  titre = '';
  sub;
  typedata = {};
  recettes = [];

  etapesPreparation;
  etapesCuisson;

  constructor(private modalController: ModalController, 
    private Activatedroute: ActivatedRoute,
    private router: Router, 
    private navCtrl: NavController, 
    private navParams: NavParams,
    public http: HttpClient) { 
      this.idrecette = this.navParams.get('idrecette');
      this.titre = this.navParams.get('titre');
    }

 

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    if(this.idrecette != "0"){
      
      /* Paramètrage du header */
      var httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization' : 'BEARER '+ API_TOKEN
        })
      }

      /* Affichage recette sélectionnée */
      this.http.get(BACK_URL + "/api/recettes/" + this.idrecette, httpOptions)
      .subscribe(data => {
      
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
    var slides = document.querySelector('ion-slides');
    slides.options = {
      initialSlide: 0,
      speed: 400
    }
  }

}
