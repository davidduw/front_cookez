import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { environment, API_TOKEN, TOKEN_KEY, BACK_URL } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-frigo',
  templateUrl: 'frigo.page.html',
  styleUrls: ['frigo.page.scss']
})
export class FrigoPage {

  empty;
  messagefrigo;
  ingredientsfrigo;
  token;
  httpOptions;

  constructor(private authService: AuthService, private router: Router, private storage: Storage, private nav: NavController, private modalController: ModalController, public http: HttpClient) {}

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

      /** Liste des ingrédients du frigo */
      this.storage.get("userinfos").then(res => {
        this.getFrigo(res.frigo);
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
  
  goToTheIngredientCategoryPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        page: "onglets/frigo"
      }
    };
    this.router.navigate(['accueil/onglets/categorie-ingredients'], navigationExtras)
  }
}
