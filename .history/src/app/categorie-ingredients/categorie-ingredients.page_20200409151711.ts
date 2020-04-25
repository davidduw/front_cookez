import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalAddIngredientPage } from './../modal-add-ingredient/modal-add-ingredient.page';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorie-ingredients',
  templateUrl: './categorie-ingredients.page.html',
  styleUrls: ['./categorie-ingredients.page.scss'],
})
export class CategorieIngredientsPage implements OnInit {

  categories = {};

  constructor(private router: Router, private nav: NavController, private modalController: ModalController) { }

  ngOnInit() {

    this.getCategories();

  }

  getCategories(){
    this.categories = [1,2,3,4,5];
  }
  async openModalAddIngredients() {
    const modal = await this.modalController.create({
      component: ModalAddIngredientPage
    });
    await modal.present();
  }
}
