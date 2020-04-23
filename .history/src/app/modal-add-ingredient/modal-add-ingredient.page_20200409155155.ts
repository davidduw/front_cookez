import { NavigationExtras, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, API_TOKEN, TOKEN_KEY, BACK_URL } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-modal-add-ingredient',
  templateUrl: './modal-add-ingredient.page.html',
  styleUrls: ['./modal-add-ingredient.page.scss'],
})
export class ModalAddIngredientPage implements OnInit {

  idcategorie;
  token;
  categorie;

  constructor(private authService: AuthService, private storage: Storage, public http: HttpClient, private modalController: ModalController, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
    console.log("Categorie : " + this.idcategorie);
    this.getCategorie(this.idcategorie);
  }

  getCategorie(idcategorie)
  {
    /** Verification si connectée */
    this.storage.get(TOKEN_KEY).then((value) => {
      if(value != null)
      {
        this.token = value;
        /* Paramètrage du header */
        var httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'BEARER ' + this.token
          })
        }

        /* Requete */
        this.http.get(BACK_URL + "api/categories/"+idcategorie, httpOptions)
        .subscribe(data => {
          this.categorie = data;
          console.log(this.categorie);
        }, error => {
          console.log(error);
          this.authService.logout();
        });
      }else{
        this.router.navigate(['/login'])
      }
    });
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
