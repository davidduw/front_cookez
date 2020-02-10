import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ModalCreateRecipePage } from '../modal-create-recipe/modal-create-recipe.page';

@Component({
  selector: 'app-creation-recette-liste',
  templateUrl: './creation-recette-liste.page.html',
  styleUrls: ['./creation-recette-liste.page.scss'],
})
export class CreationRecetteListePage implements OnInit {

  constructor(private nav: NavController, private modalController: ModalController) { }

  async openModalCreateRecipe() {
    const modal = await this.modalController.create({
      component: ModalCreateRecipePage
    });
    modal.present();
  }

  ngOnInit() {
  }

}
