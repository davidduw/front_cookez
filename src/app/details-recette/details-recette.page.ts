import { API_TOKEN, BACK_URL, TOKEN_KEY } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http } from '@angular/http';
import { ModalDetailRecipePage } from './../modal-detail-recipe/modal-detail-recipe.page';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { forEach } from '@angular/router/src/utils/collection';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-details-recette',
  templateUrl: 'details-recette.page.html',
  styleUrls: ['details-recette.page.scss']
})
export class DetailsRecettePage implements OnInit {

  information: any[];
  parentPage: string;
  // parentPage: string = "onglets/accueil-recette";
  idrecette = "";
  sub;
  typedata = {};
  recettes = [];

  nom;
  difficulte;
  preparation;
  cuisson;
  tempsTotal;
  nbrPersonnes;
  ingredients;
  etapesPreparation;
  etapesCuisson;
  quantites;
  etiquettes;
  idUser;
  allFavorites;
  favoriteId;

  token;


  constructor(private Activatedroute: ActivatedRoute,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private storage: Storage,
    private modalController: ModalController,
    private navCtrl: NavController,
    public http: HttpClient) {

    this.activatedroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.idrecette = this.router.getCurrentNavigation().extras.state.idrecette;
        this.getRecette(this.idrecette);
        this.allFavorites = [];
      }
    });
    this.getUserId();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalDetailRecipePage,
      componentProps: { 
        titre: this.nom,
        idrecette: this.idrecette
      }
    });
    return await modal.present();
  }

  isShowIngr = true;
  isShowPrepa = false;
  isShowCuisson = false;

  toggleDisplay($params) {
    switch ($params) {
      case 'ingredients':
        this.isShowIngr = !this.isShowIngr;
        break;

      case 'preparation':
        this.isShowPrepa = !this.isShowPrepa;
        break;

      case 'cuisson':
        this.isShowCuisson = !this.isShowCuisson;
        break;

      default:
        break;
    }
  }

  ngOnInit() { 
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

        this.getAllFavorites(httpOptions);
        this.getFavoriteByUserIdAndRecipeId();
        console.log(this.favoriteId);
        if (this.favoriteId != undefined) {
          var favoriteButton = <HTMLInputElement> document.getElementById("favorite_recipe");
          favoriteButton.checked = true;
          var starFull = <HTMLInputElement> document.getElementById("favorite_star");
          starFull.src="assets/icon/favorite_full.svg";
        } else {
          console.log('KC');
        }

      }else{
        this.router.navigate(['/login'])
      }
    });
  }

  getUserId() {
    this.storage.get("userinfos").then(res => {
      this.idUser = res.id;
    });
  }

  getRecette(idrecette: string) {
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
        if (idrecette != "0") {

          // /* Paramètrage du header */
          // var httpOptions = {
          //   headers: new HttpHeaders({
          //     'Content-Type': 'application/json',
          //     'Accept': 'application/json',
          //     'Authorization': 'BEARER ' + API_TOKEN
          //   })
          // }
    
          /* Affichage recette sélectionnée */
          this.http.get(BACK_URL + "/api/recettes/" + idrecette, httpOptions)
            .subscribe(data => {
    
              // titre de la recette
              this.nom = data['nom'];
    
              // difficulté de la recette
              this.difficulte = data['difficulte'];
              switch (this.difficulte) {
                case 1:
                  this.difficulte = "Facile";
                  break;
                case 2:
                  this.difficulte = "Moyen";
                  break;
                case 3:
                  this.difficulte = "Difficile";
                  break;
              }
              // temps total
              this.preparation = data['tempsprepa'];
              this.cuisson = data['tempscuisson'];
              this.tempsTotal = parseInt(this.preparation) + parseInt(this.cuisson) + "min";
    
              // nombre de personnes
              this.nbrPersonnes = data['nbrPersonnes'] + " pers.";
    
              // étiquettes
              this.etiquettes = data['etiquettes'];
    
              //ingrédients de la recette
              this.quantites = data['quantites'];
    
              // étapes de préparation
              this.etapesPreparation = data['preparations'];
    
              // étapes de cuisson
              this.etapesCuisson = data['cuissons'];
    
            }, error => {
              console.log(error);
            });
    
    
          // this.http.get("http://localhost:8000/api/types/"+this.idtype, httpOptions)
          // this.http.get("http://localhost:3200/api/etapes", httpOptions)
          // .subscribe(data => {
          //   this.etapes = data;
          //   this.etapes.forEach(etape => {
          //     const recetteEtape = etape['recette']['id']; 
          //   });
          // }, error => {
          //   console.log(error);
          // });
        }

      }else{
        this.router.navigate(['/login'])
      }
    });
  }

  getAllFavorites(httpOptions) {
    this.http.get(BACK_URL + "/api/favoris", httpOptions).subscribe(data => {
      this.allFavorites = data;
      console.log(this.allFavorites);
    }, error => {
      console.log(error);
    });; 
  }

  getFavoriteByUserIdAndRecipeId() {
    this.allFavorites.forEach(favorite => {
      let user = favorite.user.lastIndexOf('/')+1;
      let idUserFav = favorite.user.substr(user);
      let recette = favorite.recette.lastIndexOf('/')+1;
      let idRecetteFav = favorite.recette.substr(recette);

      if (idUserFav == this.idUser && idRecetteFav == this.idrecette) {
        this.favoriteId = favorite.id
      }
    });
  }

  addFavoriteRecipe() {
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
        
        var favoriteButton = <HTMLInputElement> document.getElementById("favorite_recipe");
        var isChecked = favoriteButton.checked;
        this.getAllFavorites(httpOptions);
        this.getFavoriteByUserIdAndRecipeId();
        console.log(this.favoriteId);
        if(isChecked) {
          var favoriteParams = {
            "user": "/api/users/" + this.idUser,
            "recette": "/api/recettes/" + this.idrecette
          }

          /* Requete */
          this.http.post(BACK_URL + "/api/favoris", favoriteParams, httpOptions)
          .subscribe(data => {
            var starFull = <HTMLInputElement> document.getElementById("favorite_star");
            starFull.src="assets/icon/favorite_full.svg";
          }, error => {
            console.log(error);
          });

        } else {
          var httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'BEARER ' + this.token
            })
          }

          this.http.delete(BACK_URL + "/api/favoris/" + this.favoriteId, httpOptions)
          .subscribe(data => {
            var starEmpty = <HTMLInputElement> document.getElementById("favorite_star");
            starEmpty.src="assets/icon/favorite_empty.svg";
          }, error => {
            console.log(error);
          });
        }
      }else{
        this.router.navigate(['/login'])
      }
  });
  }
}
