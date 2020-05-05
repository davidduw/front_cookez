import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ModalCreateRecipePage } from '../modal-create-recipe/modal-create-recipe.page';
import { Storage } from '@ionic/storage';
import { environment, API_TOKEN, TOKEN_KEY, BACK_URL } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalEditRecipePage } from '../modal-edit-recipe/modal-edit-recipe.page';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-creation-recette-liste',
  templateUrl: './creation-recette-liste.page.html',
  styleUrls: ['./creation-recette-liste.page.scss'],
  providers: [DatePipe]
})
export class CreationRecetteListePage implements OnInit {
  token;
  httpOptions;
  userMail;
  recettes = [];

  constructor(private nav: NavController, private datePipe: DatePipe, private router: Router, public http: HttpClient, private modalController: ModalController, private storage: Storage) { }

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

        this.storage.get("userinfos").then(res => {
          this.userMail = res['email'];
        });

        /* Requete permettant de récuperer les recettes utilisateur */
        this.http.get(BACK_URL + "/api/users", this.httpOptions)
          .subscribe(data => {
            for (const value in data) {
              if (data[value].email == this.userMail) {
                this.recettes = data[value].recettes;
                console.log(this.recettes);
                this.recettes.forEach(recette => {
                  recette.dateCreation = "Ajoutée le " + this.datePipe.transform(recette.dateCreation, 'dd/MM/yyyy');
                });
              }
            }
          });
      } else {
        this.router.navigate(['/login'])
      }
    });
  }

  async openModalCreateRecipe() {
    const modal = await this.modalController.create({
      component: ModalCreateRecipePage
    });
    modal.onDidDismiss().then((data) => {
      this.ngOnInit();
    });
    modal.present();
  }

  async openModalEditRecipe(idRecette) {
    const modal = await this.modalController.create({
      component: ModalEditRecipePage,
      componentProps: {
        idRecette: idRecette
      }
    });
    modal.onDidDismiss().then((data) => {
      this.ngOnInit();
    });
    modal.present();
  }

  editRecette(idRecette) {
    console.log('Edition recette ' + idRecette);
    this.openModalEditRecipe(idRecette);
  }

  deleteRecette(idRecette) {
    console.log('Supression recette ' + idRecette);
    this.http.delete(BACK_URL + "/api/recettes/" + idRecette, this.httpOptions)
      .subscribe(data => {
        this.ngOnInit();
      });
  }
}
