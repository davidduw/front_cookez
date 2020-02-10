import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-favoris',
  templateUrl: 'favoris.page.html',
  styleUrls: ['favoris.page.scss']
})
export class FavorisPage {

  constructor(private router: Router) {}

  goToTheDetailsRecipePage() {
    let navigationExtras: NavigationExtras = {
      state: {
        page: "onglets/favoris"
      }
    };
    this.router.navigate(['onglets/details-recette'], navigationExtras)
  }

}
