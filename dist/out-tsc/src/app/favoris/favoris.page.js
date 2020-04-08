import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var FavorisPage = /** @class */ (function () {
    function FavorisPage(router) {
        this.router = router;
    }
    FavorisPage.prototype.goToTheDetailsRecipePage = function () {
        var navigationExtras = {
            state: {
                page: "onglets/favoris"
            }
        };
        this.router.navigate(['onglets/details-recette'], navigationExtras);
    };
    FavorisPage = tslib_1.__decorate([
        Component({
            selector: 'app-favoris',
            templateUrl: 'favoris.page.html',
            styleUrls: ['favoris.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], FavorisPage);
    return FavorisPage;
}());
export { FavorisPage };
//# sourceMappingURL=favoris.page.js.map