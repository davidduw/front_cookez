import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_TOKEN, BACK_URL } from '../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
var CategorieRecettesPage = /** @class */ (function () {
    function CategorieRecettesPage(router, activatedroute, http, sanitizer) {
        var _this = this;
        this.router = router;
        this.activatedroute = activatedroute;
        this.http = http;
        this.sanitizer = sanitizer;
        this.parentPage = "onglets/accueil-recette";
        this.typedata = {};
        this.recettes = [];
        this.recettesFiltered = [];
        this.activatedroute.queryParams.subscribe(function (params) {
            if (_this.router.getCurrentNavigation().extras.state) {
                _this.idtype = _this.router.getCurrentNavigation().extras.state.idtype;
                _this.getRecettes(_this.idtype);
            }
        });
    }
    CategorieRecettesPage.prototype.ngOnInit = function () { };
    CategorieRecettesPage.prototype.getRecettes = function (idtype) {
        var _this = this;
        /* Paramètrage du header */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'BEARER ' + API_TOKEN
            })
        };
        /* Requete */
        this.http.get(BACK_URL + "api/types/" + idtype, httpOptions)
            .subscribe(function (data) {
            _this.typedata = data;
            _this.recettes = _this.typedata['recettes'];
            _this.recettes.forEach(function (recette) {
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
                var tempsTotal = parseInt(recette.tempsprepa, 10) + parseInt(recette.tempscuisson, 10);
                if (tempsTotal < 60) {
                    recette.tempsTotal = tempsTotal + "m";
                }
                else {
                    var heures = Math.floor(tempsTotal / 60);
                    var minutes = tempsTotal % 60;
                    recette.tempsTotal = heures + 'H' + minutes;
                }
                // Affichage moyenne notes
                var nbNotes = recette.notes.length;
                var sommeNotes = 0;
                recette.notes.forEach(function (note) {
                    sommeNotes += note.etoiles;
                });
                recette.noteMoyenne = Math.round(sommeNotes / nbNotes * 10) / 10;
            });
            _this.recettesFiltered = _this.recettes;
        }, function (error) {
            console.log(error);
        });
    };
    CategorieRecettesPage.prototype.getFilteredRecettes = function (ev) {
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.recettesFiltered = this.recettes.filter(function (recette) {
                return (recette.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.recettesFiltered = this.recettes;
        }
    };
    CategorieRecettesPage.prototype.safeImage = function (image) {
        if (image != undefined) {
            return this.sanitizer.bypassSecurityTrustStyle('url(' + image + ')');
        }
    };
    CategorieRecettesPage.prototype.goToTheDetailsRecipePage = function () {
        var navigationExtras = {
            state: {
                page: "onglets/categorie"
            }
        };
        this.router.navigate(['onglets/details-recette'], navigationExtras);
    };
    CategorieRecettesPage = tslib_1.__decorate([
        Component({
            selector: 'app-categorie-recettes',
            templateUrl: './categorie-recettes.page.html',
            styleUrls: ['./categorie-recettes.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, HttpClient, DomSanitizer])
    ], CategorieRecettesPage);
    return CategorieRecettesPage;
}());
export { CategorieRecettesPage };
//# sourceMappingURL=categorie-recettes.page.js.map