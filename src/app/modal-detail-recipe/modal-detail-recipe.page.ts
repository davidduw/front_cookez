import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-detail-recipe',
  templateUrl: './modal-detail-recipe.page.html',
  styleUrls: ['./modal-detail-recipe.page.scss'],
})
export class ModalDetailRecipePage implements OnInit {

  constructor(private modalController: ModalController) { }

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    var slides = document.querySelector('ion-slides');
    slides.options = {
      initialSlide: 0,
      speed: 400
    }
  }

}
