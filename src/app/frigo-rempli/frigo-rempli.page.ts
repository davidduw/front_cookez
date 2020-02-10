import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-frigo-rempli',
  templateUrl: './frigo-rempli.page.html',
  styleUrls: ['./frigo-rempli.page.scss'],
})
export class FrigoRempliPage implements OnInit {

  constructor(private router: Router) { }

  goToTheIngredientCategoryPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        page: "onglets/frigo-rempli"
      }
    };
    this.router.navigate(['onglets/categorie-ingredients'], navigationExtras)
  }

  ngOnInit() {
  }

}
