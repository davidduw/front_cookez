import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { environment, API_TOKEN, TOKEN_KEY, BACK_URL, NB_CORRES_ING} from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-frigo',
  templateUrl: 'frigo.page.html',
  styleUrls: ['frigo.page.scss']
})
export class FrigoPage {

  frigoId;
  empty;
  messagefrigo;
  ingredientsfrigo;
  token;
  httpOptions;
  recettesTrouvees = [];

  constructor(private authService: AuthService, private router: Router, private storage: Storage, private nav: NavController, private modalController: ModalController, public http: HttpClient, private sanitizer: DomSanitizer) {}

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

      /** Liste des ingrédients du frigo */
      this.storage.get("userinfos").then(res => {
        this.frigoId = res.frigo;
        this.getFrigo(this.frigoId);
      });

      }else{
        this.router.navigate(['/login'])
      }
    });

    if(this.empty)
    {
      this.messagefrigo = "Votre frigo est vide !";
    }else{
      this.messagefrigo = "Contenu de votre frigo";
    }

  }

  getFrigo(frigo)
  {
    /* Requete */
    this.http.get(BACK_URL + frigo, this.httpOptions)
    .subscribe(data => {
      this.ingredientsfrigo = data['ingredients'];
      console.log(this.ingredientsfrigo);

      if(Object.keys(this.ingredientsfrigo).length == 0)
      {
        this.empty = true;
      }

    }, error => {
      console.log(error);
      this.authService.logout();
    });
  }

  ionViewWillEnter () {
    this.storage.get("userinfos").then(res => {
      this.frigoId = res.frigo;
      this.getFrigo(this.frigoId);
    });
  }
  
  /** Recherche de recette par ingredients */
  recetteIntelligente()
  {
    var recettes;

    /* Requete */
    this.http.get(BACK_URL + "/api/recettes", this.httpOptions)
    .subscribe(data => {
      recettes = data;

      console.log(this.filtrerRecettes(recettes));
      this.recettesTrouvees = this.filtrerRecettes(recettes);
    }, error => {
      console.log(error);
      this.authService.logout();
    });
  }

  /** Filtre en fonction des ingredients */
  filtrerRecettes(recettes)
  {
    var ingredients;
    var recettesvalides = [];
    var equals = 0;
    


    for (let i = 0; i < recettes.length; i++) {
      const recette = recettes[i];
      console.log(recette);
      ingredients = recette.ingredients;
      console.log(ingredients);
      console.log(this.ingredientsfrigo);
      for (let j = 0; j < ingredients.length; j++) {
        const element = ingredients[j];
        const idIngredient = element.id;

        for (let k = 0; k < this.ingredientsfrigo.length; k++) {
          const ingredient =  this.ingredientsfrigo[k];
          const idIngredientFrigo =  ingredient.id

          if(idIngredient == idIngredientFrigo)
          {
            console.log("trouvé");
            equals++;
          }
        }
      }

      if(equals >= NB_CORRES_ING)
      {

          // Affichage difficulté
          switch (recette.difficulte) {
            case 1:
              recette.difficulte = "Facile";
              break;
            case 2:
              recette.difficulte = "Moyen";
              break;
            case 3:
              recette.difficulte = "Difficile";
              break;
            default:
              break;
          }

          // Affichage Temps total
          const tempsTotal: number = parseInt(recette.tempsprepa, 10) + parseInt(recette.tempscuisson, 10)
          if (tempsTotal < 60) {
            recette.tempsTotal = tempsTotal + "m";
          } else {
            const heures = Math.floor(tempsTotal / 60);
            const minutes = tempsTotal % 60;
            recette.tempsTotal = heures + 'H' + minutes;
          }

          // Affichage moyenne notes
          const nbNotes = recette.notes.length;
          let sommeNotes = 0;

          if(nbNotes > 0)
          {
            recette.notes.forEach(note => {
              sommeNotes += note.etoiles;
            });
  
            recette.noteMoyenne = Math.round(sommeNotes / nbNotes * 10) / 10;
          }else{
            recette.noteMoyenne = 0;

          }

        
          recettesvalides.push(recette);
      }
    }

    return recettesvalides;
  }

  safeImage(image) {
    if (image != undefined) {
      return this.sanitizer.bypassSecurityTrustStyle('url(' + image + ')');
    }
  }

  goToTheDetailsRecipePage(idrecette) {
    let navigationExtras: NavigationExtras = {
      state: {
        idrecette: idrecette,
        name: "idrecette"
      }
    };
    this.router.navigate(['accueil/onglets/details-recette'], navigationExtras);
  }

  goToTheIngredientCategoryPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        page: "onglets/frigo"
      }

    };
    this.router.navigate(['accueil/onglets/categorie-ingredients'], navigationExtras)
  }
}
