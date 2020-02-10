import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil-recette',
  templateUrl: 'accueil-recette.page.html',
  styleUrls: ['accueil-recette.page.scss']
})
export class AccueilRecettePage {

  constructor(private router: Router) {}

  goToTheCategoryPage() {
    this.router.navigateByUrl('/onglets/categorie');
  }

  goToTheUserInfoPage() {
    this.router.navigateByUrl('/onglets/user-info')
  }
}
