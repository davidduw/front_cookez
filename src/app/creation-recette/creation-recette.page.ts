import { ModalController, NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { ModalCreateRecipePage } from '../modal-create-recipe/modal-create-recipe.page';

@Component({
  selector: 'app-creation-recette',
  templateUrl: 'creation-recette.page.html',
  styleUrls: ['creation-recette.page.scss']
})
export class CreationRecettePage {

  constructor(private nav: NavController, private modalController: ModalController) {}

  async openModalCreateRecipe() {
    const modal = await this.modalController.create({
      component: ModalCreateRecipePage
    });
    modal.present();
  }
}
