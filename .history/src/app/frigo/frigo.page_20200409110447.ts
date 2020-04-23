import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-frigo',
  templateUrl: 'frigo.page.html',
  styleUrls: ['frigo.page.scss']
})
export class FrigoPage {

  empty = false;
  messagefrigo;


  constructor(private router: Router, private nav: NavController, private modalController: ModalController) {}

  ngOnInit() { 
    this.messagefrigo = "Votre frigo est vide !";
  }

  goToTheIngredientCategoryPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        page: "onglets/frigo"
      }
    };
    this.router.navigate(['accueil/onglets/categorie-ingredients'], navigationExtras)
  }
}
