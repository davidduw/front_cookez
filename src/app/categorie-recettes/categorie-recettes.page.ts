import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-categorie-recettes',
  templateUrl: './categorie-recettes.page.html',
  styleUrls: ['./categorie-recettes.page.scss'],
})
export class CategorieRecettesPage implements OnInit {

  parentPage: string = "onglets/accueil-recette";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToTheDetailsRecipePage() {
    let navigationExtras: NavigationExtras = {
      state: {
        page: "onglets/categorie"
      }
    };
    this.router.navigate(['onglets/details-recette'], navigationExtras)
  }
}
