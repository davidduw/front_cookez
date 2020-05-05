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
  httpOptions;
  checked = [];
  
  /** Ingrédients deja selectionnés */
  ingredientsstock;

  constructor(private authService: AuthService, private storage: Storage, public http: HttpClient, private modalController: ModalController, public toastController: ToastController, private router: Router) {

  }

  ngOnInit() {
    
    /** Verification si connectée */
    this.storage.get(TOKEN_KEY).then((value) => {
      if(value != null)
      {
        this.token = value;
        /* Paramètrage du header */
      this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'BEARER ' + this.token
          })
        } 
      }else{
        this.authService.logout();
      }
    });

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
        this.http.get(BACK_URL + "/api/categories/"+idcategorie, httpOptions)
        .subscribe(data => {
          this.ingredients = data['ingredients'];

          this.ingredients.forEach(element =>
            element.isChecked = false
          );

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
    toast.present();
    this.closeModalAddIngredients();
  }

  goToFridgePage() {
    let navigationExtras: NavigationExtras = {
      state: {
        page: "accueil/onglets/categorie-ingredients"
      }
    };
    this.router.navigate(['accueil/onglets/frigo'], navigationExtras)
  }

  isShowCreateIngr = false;

  createIngredient() {
    this.isShowCreateIngr = true;
  }

  ajouterIngredients()
  {

    /** On recupere les ingredients deja existants */

    this.storage.get("userinfos").then(res => {

      /* Requete */
      this.http.get(BACK_URL + res.frigo , this.httpOptions)
      .subscribe(data => {
          this.checked = data['ingredients'];

          for (let index = 0; index < this.ingredients.length; index++) {
            const element = this.ingredients[index];
            if(element['isChecked'] == true)
            {
              this.checked.push(element);
            }
          }

          console.log(this.checked);

          this.http.put(BACK_URL + this.userinfos.frigo, this.formFrigo(this.checked), this.httpOptions)
          .subscribe(data => {
            console.log(data);
            this.presentToast(); 
          }, error => {
            console.log(error);
          });

      }, error => {
        console.log(error);
        this.authService.logout();
      });

    });
  }

  /** Preparation du body */
  formFrigo(ingredients)
  {

    let ingredientsForm = [];

    for (var i = 0; i < ingredients.length; i++) {
      ingredientsForm.push("/api/ingredients/" + ingredients[i].id);
    }

    let frigoBody = {
      "ingredients": ingredientsForm
    }

    return frigoBody;

  }

  /** Permet de récupérer les ingrédients du frigo */
  contenuFrigo()
  {
    /* Requete */
    console.log(BACK_URL + this.userinfos.frigo);

    this.http.get(BACK_URL + this.userinfos.frigo , this.httpOptions)
    .subscribe(data => {
      this.ingredientsstock = data['ingredients'];
      console.log(this.ingredientsstock);
    }, error => {
      console.log(error);
    });

  }

}
