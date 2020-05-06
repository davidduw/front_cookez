import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { TOKEN_KEY, BACK_URL } from 'src/environments/environment';

@Component({
  selector: 'app-modal-edit-recipe',
  templateUrl: './modal-edit-recipe.page.html',
  styleUrls: ['./modal-edit-recipe.page.scss'],
})
export class ModalEditRecipePage implements OnInit {
  token;
  httpOptions;

  idRecette;

  types = {};
  etiquettes = {};
  ingredients = {};
  ingredientIncr = [];
  qteArray = [];
  ingredientArray = [];
  preparationIncr = [];
  prepArray = [];
  cuissonIncr = [];
  cuisArray = [];
  etiquettesChecked = [];

  titreInput;
  typeInput;
  nbPortionsInput;
  difficulte;
  heuresPreparation;
  minutesPreparation;
  heuresCuisson;
  minutesCuisson;
  etiquettesRecette = [];
  ingredientsRecette = [];
  userId;

  recette;

  constructor(private modalController: ModalController,
    public toastController: ToastController,
    private router: Router,
    public http: HttpClient,
    private navParams: NavParams,
    private storage: Storage) {
    this.idRecette = this.navParams.get('idRecette');
  }

  ngOnInit() {

    /** Verification si connectée */
    this.storage.get(TOKEN_KEY).then((value) => {
      console.log(value);
      if (value != null) {
        this.token = value;

        /* Paramètrage du header */
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'BEARER ' + this.token
          })
        }

        this.getDatas().then(() => {
          this.getRecette(this.idRecette);
        });

      } else {
        this.router.navigate(['/login'])
      }
    });

    this.storage.get("userinfos").then(res => {
      console.log(res);
      this.userId = res['id'];
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async getDatas() {
    await this.getTypes();
    await this.getEtiquettes();
    await this.getIngredients();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Votre recette a bien été modifiée !",
      duration: 2000,
      cssClass: "modal_create_recipe_toast",
      color: "tertiary"
    });
    toast.present();
    this.closeModal()
  }

  editerRecette() {
    this.updateRecette();
    this.presentToast();
  }

  updateRecette() {
    /* Requete */
    this.http.put(BACK_URL + "/api/recettes/" + this.idRecette, this.getRecetteBody(), this.httpOptions)
      .subscribe(data => {
        console.log(data);
        this.recette.quantites.forEach(quantite => {
          this.http.delete(BACK_URL + "/api/quantites/" + quantite.id, this.httpOptions)
          .subscribe(data => {
            console.log("Suppression quantité n°" + quantite.id);
          });
        });
        this.getQuantiteBody(this.idRecette).forEach(quantite => {
          this.postQuantites(quantite);
        });

        this.recette.preparations.forEach(preparation => {
          this.http.delete(BACK_URL + "/api/preparations/" + preparation.id, this.httpOptions)
          .subscribe(data => {
            console.log("Suppression preparation n°" + preparation.id);
          });
        });
        this.getPreparationBody(this.idRecette).forEach(preparation => {
          this.postPreparations(preparation);
        });

        this.recette.cuissons.forEach(cuisson => {
          this.http.delete(BACK_URL + "/api/cuissons/" + cuisson.id, this.httpOptions)
          .subscribe(data => {
            console.log("Suppression cuisson n°" + cuisson.id);
          });
        });
        this.getCuissonBody(this.idRecette).forEach(cuisson => {
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

  initModalData() {
    this.titreInput = this.recette.nom;
    this.typeInput = this.recette.type.id;
    this.nbPortionsInput = this.recette.nbrPersonnes;
    this.difficulte = this.recette.difficulte;
    this.minutesPreparation = this.recette.tempsprepa % 60;
    this.heuresPreparation = (this.recette.tempsprepa - this.minutesPreparation) / 60;
    this.minutesCuisson = this.recette.tempscuisson % 60;
    this.heuresCuisson = (this.recette.tempscuisson - this.minutesCuisson) / 60;

    this.recette.etiquettes.forEach(etiquette => {
      this.etiquettesChecked.push("" + etiquette.id);
    });
    this.etiquettesChecked.forEach(idEtiq => {
      let etInput = document.getElementById(idEtiq) as HTMLInputElement;
      etInput.checked = true;
    });

    if (this.recette.ingredients.length == 0) {
      this.ingredientIncr = [0];
      this.ingredientArray = [""];
    } else {
      for (let index = 0; index < this.recette.ingredients.length; index++) {
        this.qteArray.push("" + this.recette.quantites[index].quantite);
        this.ingredientArray.push("" + this.recette.quantites[index].ingredient.id);
        this.ingredientIncr.push(this.ingredientIncr.length);
      }
    }

    if (this.recette.preparations.length == 0) {
      this.preparationIncr = [0];
      this.prepArray = [""];
    } else {
      this.recette.preparations = this.recette.preparations.sort((a, b) => a.numEtape - b.numEtape);
      for (let index = 0; index < this.recette.preparations.length; index++) {
        this.prepArray.push(this.recette.preparations[index].etapeText);
        this.preparationIncr.push(this.preparationIncr.length);
      }
    }

    if (this.recette.cuissons.length == 0) {
      this.cuissonIncr = [0];
      this.cuisArray = [""];
    } else {
      this.recette.cuissons = this.recette.cuissons.sort((a, b) => a.numEtape - b.numEtape);
      for (let index = 0; index < this.recette.cuissons.length; index++) {
        this.cuisArray.push(this.recette.cuissons[index].etapeText);
        this.cuissonIncr.push(this.cuissonIncr.length);
      }
    }
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

  getRecette(idRecette) {
    /* Requete */
    this.http.get(BACK_URL + "/api/recettes/" + idRecette, this.httpOptions)
      .subscribe(data => {
        this.recette = data;
        console.log(this.recette)
        this.initModalData();
      }, error => {
        console.log(error);
      });
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