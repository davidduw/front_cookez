import { Http } from '@angular/http';
import { ModalDetailRecipePage } from './../modal-detail-recipe/modal-detail-recipe.page';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-details-recette',
  templateUrl: 'details-recette.page.html',
  styleUrls: ['details-recette.page.scss']
})
export class DetailsRecettePage implements OnInit{

  information: any [];
  parentPage: string;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private modalController: ModalController,
    private http: Http,
    private navCtrl: NavController) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.parentPage = this.router.getCurrentNavigation().extras.state.page;
      }
    });

    let localData = this.http.get('assets/information.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalDetailRecipePage,
    });
    modal.present();
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }

  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

  

  ngOnInit() {
  }
}
