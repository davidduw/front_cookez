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
  ingredients;
  userinfos;

  /** Ingrédients deja selectionnés */
  ingredientsstock;
  constructor(private authService: AuthService, private storage: Storage, public http: HttpClient, private modalController: ModalController, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
    
    /** Informations utilisateur */
    this.storage.get("userinfos").then(res => {
      this.userinfos = res;
    });

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
          this.ingredients = data['ingredients'];
          console.log(this.ingredients);
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

  gestionIngredient()
  {

  }

  ajouterIngredient(idingredient)
  {
    console.log(idingredient);
  }

  retirerIngredient(idingredient)
  {
    console.log(idingredient);
  }

  contenuFrigo()
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
        this.http.get(BACK_URL + this.userinfos.frigo , httpOptions)
        .subscribe(data => {
          console.log(data);
        }, error => {
          console.log(error);
          this.authService.logout();
        });
      }else{
        this.authService.logout();
      }
    });
  }

}
