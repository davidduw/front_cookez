import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var FrigoRempliPage = /** @class */ (function () {
    function FrigoRempliPage(router) {
        this.router = router;
    }
    FrigoRempliPage.prototype.goToTheIngredientCategoryPage = function () {
        var navigationExtras = {
            state: {
                page: "onglets/frigo-rempli"
            }
        };
        this.router.navigate(['onglets/categorie-ingredients'], navigationExtras);
    };
    FrigoRempliPage.prototype.ngOnInit = function () {
    };
    FrigoRempliPage = tslib_1.__decorate([
        Component({
            selector: 'app-frigo-rempli',
            templateUrl: './frigo-rempli.page.html',
            styleUrls: ['./frigo-rempli.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], FrigoRempliPage);
    return FrigoRempliPage;
}());
export { FrigoRempliPage };
//# sourceMappingURL=frigo-rempli.page.js.map