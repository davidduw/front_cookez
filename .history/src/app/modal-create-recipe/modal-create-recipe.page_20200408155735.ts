import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-modal-create-recipe',
  templateUrl: './modal-create-recipe.page.html',
  styleUrls: ['./modal-create-recipe.page.scss'],
})
export class ModalCreateRecipePage implements OnInit {

  constructor(private modalController: ModalController, public toastController: ToastController, private router: Router) { }

  closeModal() {
    this.modalController.dismiss();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Votre recette a bien été enregistrée !",
      duration: 2000,
      cssClass: "modal_create_recipe_toast",
      color: "tertiary"
    });
    toast.present()
    this.goToTheListOfRecipesCreatedPage()
    this.closeModal()
  }

  goToTheListOfRecipesCreatedPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        page: "accueil/onglets/accueil-recette"
      }
    };
    this.router.navigate(['onglets/creation-recette-liste'], navigationExtras)
  }

  ngOnInit() {
  }

}
