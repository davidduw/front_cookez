import { API_TOKEN, BACK_URL, TOKEN_KEY } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal-detail-recipe',
  templateUrl: './modal-detail-recipe.page.html',
  styleUrls: ['./modal-detail-recipe.page.scss'],
})
export class ModalDetailRecipePage implements OnInit {
  idrecette = "";
  titre = '';
  token;
  httpOptions;

  etapesPreparation;
  etapesCuisson;

  constructor(private modalController: ModalController,
    private Activatedroute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private navParams: NavParams,
    public http: HttpClient) {
    this.idrecette = this.navParams.get('idrecette');
    this.titre = this.navParams.get('titre');
  }



  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    if (this.idrecette != "0") {

      /** Verification si connectée */
      this.storage.get(TOKEN_KEY).then((value) => {
        console.log(value);
        if (value != null) {
          this.token = value;

          /* Paramètrage du header */
          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'BEARER ' + this.token
            })
          }
        } else {
          this.router.navigate(['/login'])
        }
      });

      /* Affichage recette sélectionnée */
      this.http.get(BACK_URL + "/api/recettes/" + this.idrecette, this.httpOptions)
        .subscribe(data => {

          // étapes de préparation
          this.etapesPreparation = data['preparations'];

          // étapes de cuisson
          this.etapesCuisson = data['cuissons'];

        }, error => {
          console.log(error);
        });
    }
    var slides = document.querySelector('ion-slides');
    slides.options = {
      initialSlide: 0,
      speed: 400
    }
  }

}
