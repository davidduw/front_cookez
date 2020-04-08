import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
var FrigoPage = /** @class */ (function () {
    function FrigoPage(router, nav, modalController) {
        this.router = router;
        this.nav = nav;
        this.modalController = modalController;
    }
    FrigoPage.prototype.goToTheIngredientCategoryPage = function () {
        var navigationExtras = {
            state: {
                page: "onglets/frigo"
            }
        };
        this.router.navigate(['onglets/categorie-ingredients'], navigationExtras);
    };
    FrigoPage = tslib_1.__decorate([
        Component({
            selector: 'app-frigo',
            templateUrl: 'frigo.page.html',
            styleUrls: ['frigo.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router, NavController, ModalController])
    ], FrigoPage);
    return FrigoPage;
}());
export { FrigoPage };
//# sourceMappingURL=frigo.page.js.map