import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { API_TOKEN, BACK_URL } from '../../environments/environment';
import { Storage } from '@ionic/storage';
var AccueilRecettePage = /** @class */ (function () {
    function AccueilRecettePage(storage, router, http, sanitizer) {
        this.storage = storage;
        this.router = router;
        this.http = http;
        this.sanitizer = sanitizer;
        this.types = {};
        this.getTypes();
    }
    AccueilRecettePage.prototype.ngOnInit = function () {
        var _this = this;
        /** Verification si connectée */
        this.storage.get('token').then(function (value) {
            _this.token = value;
            console.log(_this.token);
        });
    };
    AccueilRecettePage.prototype.getTypes = function () {
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
        this.http.get(BACK_URL + "api/types", httpOptions)
            .subscribe(function (data) {
            _this.types = data;
        }, function (error) {
            console.log(error);
        });
    };
    AccueilRecettePage.prototype.safeImage = function (image) {
        if (image != undefined) {
            return this.sanitizer.bypassSecurityTrustStyle('url(' + image + ')');
        }
    };
    AccueilRecettePage.prototype.goToTheCategoryPage = function (idtype) {
        var navigationExtras = {
            state: {
                idtype: idtype,
                name: "idtype"
            }
        };
        this.router.navigate(['/onglets/categorie'], navigationExtras);
    };
    AccueilRecettePage.prototype.goToTheUserInfoPage = function () {
        this.router.navigateByUrl('/onglets/user-info');
    };
    AccueilRecettePage = tslib_1.__decorate([
        Component({
            selector: 'app-accueil-recette',
            templateUrl: 'accueil-recette.page.html',
            styleUrls: ['accueil-recette.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, HttpClient, DomSanitizer])
    ], AccueilRecettePage);
    return AccueilRecettePage;
}());
export { AccueilRecettePage };
//# sourceMappingURL=accueil-recette.page.js.map