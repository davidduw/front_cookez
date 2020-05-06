import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment, API_TOKEN, TOKEN_KEY, BACK_URL } from '../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal-create-recipe',
  templateUrl: './modal-create-recipe.page.html',
  styleUrls: ['./modal-create-recipe.page.scss'],
})
export class ModalCreateRecipePage implements OnInit {
  token;
  httpOptions;

  types = {};
  etiquettes = {};
  ingredients = {};
  ingredientIncr = [0];
  qteArray = [""];
  ingredientArray = [""];
  preparationIncr = [0];
  prepArray = [""];
  cuissonIncr = [0];
  cuisArray = [""];
  etiquettesChecked = [];

  titreInput;
  typeInput;
  nbPortionsInput;
  difficulte = 1;
  heuresPreparation;
  minutesPreparation;
  heuresCuisson;
  minutesCuisson;
  etiquettesRecette = [];
  ingredientsRecette = [];
  userId;

  recette;

  constructor(private modalController: ModalController, public toastController: ToastController, private router: Router, public http: HttpClient, private storage: Storage) { }

  ngOnInit() {

     /** Verification si connectée */
     this.storage.get(TOKEN_KEY).then((value) => {
      console.log(value);
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

      this.getTypes();
      this.getEtiquettes();
      this.getIngredients();

      }else{
        this.router.navigate(['/login'])
      }
    });

    this.storage.get("userinfos").then(res => {
      console.log(res);
      this.userId = res['id'];
    });
  }

  closeModal(etat) {
    this.modalController.dismiss(etat);
  }

  enregistrerRecette() {
    this.postRecette();
    this.presentToast();
  }

  postRecette() {
    /* Requete */
    this.http.post(BACK_URL + "/api/recettes", this.getRecetteBody(), this.httpOptions)
      .subscribe(data => {
        console.log(data);
        let idRecette = data['id'];
        this.getQuantiteBody(idRecette).forEach(quantite => {
          this.postQuantites(quantite);
        });
        this.getPreparationBody(idRecette).forEach(preparation => {
          this.postPreparations(preparation);
        });
        this.getCuissonBody(idRecette).forEach(cuisson => {
          this.postCuissons(cuisson);
        });
      }, error => {
        console.log(error);
      });
  }

  postQuantites(quantiteBody: any) {
    /* Requete */
    this.http.post(BACK_URL + "/api/quantites", quantiteBody, this.httpOptions)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  postPreparations(preparationBody: any) {
    /* Requete */
    this.http.post(BACK_URL + "/api/preparations", preparationBody, this.httpOptions)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  postCuissons(cuissonBody: any) {
    /* Requete */
    this.http.post(BACK_URL + "/api/cuissons", cuissonBody, this.httpOptions)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  getRecetteBody(): any {
    if (this.heuresPreparation === undefined) {
      this.heuresPreparation = 0;
    }
    if (this.heuresCuisson === undefined) {
      this.heuresCuisson = 0;
    }
    let heuresPrepToMin = this.heuresPreparation == 0 ? 0 : this.heuresPreparation * 60;
    let tempsPrep = heuresPrepToMin + this.minutesPreparation;
    let heuresCuisToMin = this.heuresCuisson == 0 ? 0 : this.heuresCuisson * 60;
    let tempsCuis = heuresCuisToMin + this.minutesCuisson;

    for (var i = 0; i < this.etiquettesChecked.length; i++) {
      this.etiquettesRecette.push("/api/etiquettes/" + this.etiquettesChecked[i]);
    }

    for (var i = 0; i < this.ingredientArray.length; i++) {
      this.ingredientsRecette.push("/api/ingredients/" + this.ingredientArray[i]);
    }

    let recetteBody = {
      "nom": this.titreInput,
      "type": "/api/types/" + this.typeInput,
      "nbrPersonnes": +this.nbPortionsInput,
      "difficulte": +this.difficulte,
      "tempsprepa": tempsPrep.toString(),
      "tempscuisson": tempsCuis.toString(),
      "createur": "/api/users/" + this.userId,
      "statut": "A Verifier",
      "dateCreation": new Date(),
      "etiquettes": this.etiquettesRecette,
      "ingredients": this.ingredientsRecette
    }

    return recetteBody;
  }

  getQuantiteBody(idRecette: any): any {
    let quantitesRecette = [];
    for (var i = 0; i < this.qteArray.length; i++) {
      let quantiteObj = {
        "quantite": this.qteArray[i],
        "ingredient": "/api/ingredients/" + this.ingredientArray[i],
        "recette": "/api/recettes/" + idRecette
      }
      quantitesRecette.push(quantiteObj);
    }
    return quantitesRecette;
  }

  getPreparationBody(idRecette: any): any {
    let preparationRecette = [];
    for (var i = 0; i < this.prepArray.length; i++) {
      let preparationObj = {
        "etapeText": this.prepArray[i],
        "numEtape": i + 1,
        "recette": "/api/recettes/" + idRecette
      }
      preparationRecette.push(preparationObj);
    }
    return preparationRecette;
  }

  getCuissonBody(idRecette: any): any {
    let cuissonRecette = [];
    for (var i = 0; i < this.cuisArray.length; i++) {
      let cuissonObj = {
        "etapeText": this.cuisArray[i],
        "numEtape": i + 1,
        "recette": "/api/recettes/" + idRecette
      }
      cuissonRecette.push(cuissonObj);
    }
    return cuissonRecette;
  }

  etiquetteclick(event: any) {
    if (event.target.checked) {
      this.etiquettesChecked.push(event.target.id)
    } else {
      const index = this.etiquettesChecked.indexOf(event.target.id, 0);
      if (index > -1) {
        this.etiquettesChecked.splice(index, 1);
      }
    }
  }

  onChangeType(event: any) {
    this.typeInput = event.detail.value;
  }

  onChangeDifficulte(event: any) {
    this.difficulte = event.detail.value;
  }

  onChangeIngredient(event: any, index: any) {
    this.ingredientArray[index] = event.detail.value;
  }

  removeIngredientLine(line: number) {
    this.ingredientIncr.splice(line, 1);
    for (var i = 0; i < this.ingredientIncr.length; i++) {
      this.ingredientIncr[i] = i;
    }
    this.qteArray.splice(line, 1);
    this.ingredientArray.splice(line, 1);
  }

  addIngredientLine() {
    this.ingredientIncr.push(this.ingredientIncr.length);
    this.qteArray.push("");
    this.ingredientArray.push("");
  }

  removePreparationLine(line: number) {
    this.preparationIncr.splice(line, 1);
    for (var i = 0; i < this.preparationIncr.length; i++) {
      this.preparationIncr[i] = i;
    }
    this.prepArray.splice(line, 1);
  }

  addPreparationLine() {
    this.preparationIncr.push(this.preparationIncr.length);
    this.prepArray.push("");
  }

  removeCuissonLine(line: number) {
    this.cuissonIncr.splice(line, 1);
    for (var i = 0; i < this.cuissonIncr.length; i++) {
      this.cuissonIncr[i] = i;
    }
    this.cuisArray.splice(line, 1);
  }

  addCuissonLine() {
    this.cuissonIncr.push(this.cuissonIncr.length);
    this.cuisArray.push("");
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Votre recette a bien été enregistrée !",
      duration: 2000,
      cssClass: "modal_create_recipe_toast",
      color: "tertiary"
    });
    toast.present()
    this.closeModal("post");
  }

  getTypes() {
    /* Requete */
    this.http.get(BACK_URL + "/api/types", this.httpOptions)
      .subscribe(data => {
        this.types = data;
        console.log(this.types)
      }, error => {
        console.log(error);
      });
  }

  getEtiquettes() {
    /* Requete */
    this.http.get(BACK_URL + "/api/etiquettes", this.httpOptions)
      .subscribe(data => {
        this.etiquettes = data;
        console.log(this.etiquettes)
      }, error => {
        console.log(error);
      });
  }

  getIngredients() {
    /* Requete */
    this.http.get(BACK_URL + "/api/ingredients", this.httpOptions)
      .subscribe(data => {
        this.ingredients = data;
        console.log(this.ingredients)
      }, error => {
        console.log(error);
      });
  }
}
