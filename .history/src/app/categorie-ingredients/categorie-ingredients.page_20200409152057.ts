import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalAddIngredientPage } from './../modal-add-ingredient/modal-add-ingredient.page';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, API_TOKEN, TOKEN_KEY, BACK_URL } from '../../environments/environment';

@Component({
  selector: 'app-categorie-ingredients',
  templateUrl: './categorie-ingredients.page.html',
  styleUrls: ['./categorie-ingredients.page.scss'],
})
export class CategorieIngredientsPage implements OnInit {

  categories = {};
  token;

  constructor(private storage: Storage, public http: HttpClient, private router: Router, private nav: NavController, private modalController: ModalController) { }

  ngOnInit() {

    this.getCategories();

  }

  getCategories(){
    this.categories = [1,2,3,4,5];

    /** Verification si connectée */
    this.storage.get(TOKEN_KEY).then((value) => {
      if(value != null)
      {
        this.token = value;
        /* Paramètrage du header */
        var httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'BEARER ' + this.token
          })
        }

        /* Requete */
        this.http.get(BACK_URL + "api/types", httpOptions)
        .subscribe(data => {
          this.types = data;
        }, error => {
          console.log(error);
          this.authService.logout();
        });

      }else{
        this.router.navigate(['/login'])
      }
    });


  }
  async openModalAddIngredients() {
    const modal = await this.modalController.create({
      component: ModalAddIngredientPage
    });
    await modal.present();
  }
}
