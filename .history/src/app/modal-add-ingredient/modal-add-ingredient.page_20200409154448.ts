import { NavigationExtras, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-add-ingredient',
  templateUrl: './modal-add-ingredient.page.html',
  styleUrls: ['./modal-add-ingredient.page.scss'],
})
export class ModalAddIngredientPage implements OnInit {

  idcategorie;

  constructor(private modalController: ModalController, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
    console.log("Categorie : " + this.idcategorie);
  }

  closeModalAddIngredients() {
    this.modalController.dismiss();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Ces aliments ont été ajoutés à votre frigo !",
      duration: 2000,
      cssClass: "modal_ingr_toast",
      color: "tertiary"
    });
    toast.present()
    this.goToTheFullFridgePage()
    this.closeModalAddIngredients()
  }

  goToTheFullFridgePage() {
    let navigationExtras: NavigationExtras = {
      state: {
        page: "onglets/categorie-ingredients"
      }
    };
    this.router.navigate(['onglets/frigo-rempli'], navigationExtras)
  }

  isShowCreateIngr = false;

  createIngredient() {
    this.isShowCreateIngr = true;
  }

}
