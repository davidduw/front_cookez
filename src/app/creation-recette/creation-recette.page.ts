import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ModalCreateRecipePage } from '../modal-create-recipe/modal-create-recipe.page';
import { Storage } from '@ionic/storage';
import { environment, API_TOKEN, TOKEN_KEY, BACK_URL } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation-recette',
  templateUrl: 'creation-recette.page.html',
  styleUrls: ['creation-recette.page.scss']
})
export class CreationRecettePage implements OnInit {
  token;
  httpOptions;

  constructor(private nav: NavController, private router: Router, private modalController: ModalController, private storage: Storage) {}

  ngOnInit() {

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

    this.storage.get("userinfos").then(res => {
      console.log(res);
      if(res['recettes'].length != 0){
        this.router.navigate(['accueil/onglets/creation-recette-liste']);
      }
    });
  }

  async openModalCreateRecipe() {
    const modal = await this.modalController.create({
      component: ModalCreateRecipePage
    });
    modal.present();
  }
}
