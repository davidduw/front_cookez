import * as tslib_1 from "tslib";
import { API_TOKEN } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController, NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
var ModalDetailRecipePage = /** @class */ (function () {
    function ModalDetailRecipePage(modalController, Activatedroute, router, navCtrl, http) {
        this.modalController = modalController;
        this.Activatedroute = Activatedroute;
        this.router = router;
        this.navCtrl = navCtrl;
        this.http = http;
        // parentPage: string = "onglets/accueil-recette";
        this.idtype = "";
        this.typedata = {};
        this.recettes = [];
    }
    ModalDetailRecipePage.prototype.closeModal = function () {
        this.modalController.dismiss();
    };
    ModalDetailRecipePage.prototype.ngOnInit = function () {
        var _this = this;
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
        var slides = document.querySelector('ion-slides');
        slides.options = {
            initialSlide: 0,
            speed: 400
        };
    };
    ModalDetailRecipePage = tslib_1.__decorate([
        Component({
            selector: 'app-modal-detail-recipe',
            templateUrl: './modal-detail-recipe.page.html',
            styleUrls: ['./modal-detail-recipe.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            ActivatedRoute,
            Router,
            NavController,
            HttpClient])
    ], ModalDetailRecipePage);
    return ModalDetailRecipePage;
}());
export { ModalDetailRecipePage };
//# sourceMappingURL=modal-detail-recipe.page.js.map