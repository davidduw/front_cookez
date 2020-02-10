import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-frigo',
  templateUrl: 'frigo.page.html',
  styleUrls: ['frigo.page.scss']
})
export class FrigoPage {

  constructor(private router: Router, private nav: NavController, private modalController: ModalController) {}

  goToTheIngredientCategoryPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        page: "onglets/frigo"
      }
    };
    this.router.navigate(['onglets/categorie-ingredients'], navigationExtras)
  }
}
