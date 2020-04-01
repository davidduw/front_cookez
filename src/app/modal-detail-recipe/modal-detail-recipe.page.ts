import { API_TOKEN } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-modal-detail-recipe',
  templateUrl: './modal-detail-recipe.page.html',
  styleUrls: ['./modal-detail-recipe.page.scss'],
})
export class ModalDetailRecipePage implements OnInit {

  constructor(private modalController: ModalController, 
    private Activatedroute: ActivatedRoute,
    private router: Router, 
    private navCtrl: NavController, 
    public http: HttpClient) { }

  information: any [];
  parentPage: string;
  // parentPage: string = "onglets/accueil-recette";
  idtype = "";
  sub;
  typedata = {};
  recettes = [];

  etapesPreparation;
  etapesCuisson;

  closeModal() {
    this.modalController.dismiss();
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

      /* Affichage recette sélectionnée */

      // this.http.get("http://localhost:8000/api/types/"+this.idtype, httpOptions)
      this.http.get("http://localhost:3200/api/recettes/1", httpOptions)
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
