import * as tslib_1 from "tslib";
import { API_TOKEN } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http } from '@angular/http';
import { ModalDetailRecipePage } from './../modal-detail-recipe/modal-detail-recipe.page';
import { ModalController, NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
var DetailsRecettePage = /** @class */ (function () {
    function DetailsRecettePage(Activatedroute, router, modalController, 
    // private http: Http,
    navCtrl, http) {
        // this.router.queryParams.subscribe(params => {
        //   if (this.router.getCurrentNavigation().extras.state) {
        //     this.parentPage = this.router.getCurrentNavigation().extras.state.page;
        //   }
        // });
        this.Activatedroute = Activatedroute;
        this.router = router;
        this.modalController = modalController;
        this.navCtrl = navCtrl;
        this.http = http;
        // parentPage: string = "onglets/accueil-recette";
        this.idtype = "";
        this.typedata = {};
        this.recettes = [];
        this.isShowIngr = true;
        this.isShowPrepa = false;
        this.isShowCuisson = false;
        // let localData = this.http.get('assets/information.json').map(res => res.json().items);
        // localData.subscribe(data => {
        //   this.information = data;
        // });
    }
    DetailsRecettePage.prototype.openModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ModalDetailRecipePage,
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    DetailsRecettePage.prototype.toggleDisplay = function ($params) {
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
    };
    DetailsRecettePage.prototype.ngOnInit = function () {
        var _this = this;
        // this.nom = "poulet";
        this.sub = this.Activatedroute.paramMap.subscribe(function (params) {
            console.log(params);
            _this.idtype = params.get('idtype');
        });
        if (this.idtype != "0") {
            /* Paramètrage du header */
            var httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'BEARER ' + API_TOKEN
                })
            };
            /* Affichage recette sélectionnée */
            // this.http.get("http://localhost:8000/api/types/"+this.idtype, httpOptions)
            this.http.get("http://localhost:3200/api/recettes/1", httpOptions)
                .subscribe(function (data) {
                // titre de la recette
                _this.nom = data['nom'];
                // difficulté de la recette
                _this.difficulte = data['difficulte'];
                switch (_this.difficulte) {
                    case 1:
                        _this.difficulte = "Facile";
                        break;
                    case 2:
                        _this.difficulte = "Moyen";
                        break;
                    case 3:
                        _this.difficulte = "Difficile";
                        break;
                }
                // temps total
                _this.preparation = data['tempsprepa'];
                _this.cuisson = data['tempscuisson'];
                _this.tempsTotal = parseInt(_this.preparation) + parseInt(_this.cuisson) + "min";
                // nombre de personnes
                _this.nbrPersonnes = data['nbrPersonnes'] + " pers.";
                // étiquettes
                _this.etiquettes = data['etiquettes'];
                //ingrédients de la recette
                _this.quantites = data['quantites'];
                // étapes de préparation
                _this.etapesPreparation = data['preparations'];
                // étapes de cuisson
                _this.etapesCuisson = data['cuissons'];
            }, function (error) {
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
    };
    DetailsRecettePage = tslib_1.__decorate([
        Component({
            selector: 'app-details-recette',
            templateUrl: 'details-recette.page.html',
            styleUrls: ['details-recette.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            Router,
            ModalController,
            NavController,
            HttpClient])
    ], DetailsRecettePage);
    return DetailsRecettePage;
}());
export { DetailsRecettePage };
//# sourceMappingURL=details-recette.page.js.map