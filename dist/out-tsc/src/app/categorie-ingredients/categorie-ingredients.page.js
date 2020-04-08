import * as tslib_1 from "tslib";
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalAddIngredientPage } from './../modal-add-ingredient/modal-add-ingredient.page';
import { Component } from '@angular/core';
var CategorieIngredientsPage = /** @class */ (function () {
    function CategorieIngredientsPage(router, nav, modalController) {
        this.router = router;
        this.nav = nav;
        this.modalController = modalController;
    }
    CategorieIngredientsPage.prototype.ngOnInit = function () {
    };
    CategorieIngredientsPage.prototype.openModalAddIngredients = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ModalAddIngredientPage
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CategorieIngredientsPage = tslib_1.__decorate([
        Component({
            selector: 'app-categorie-ingredients',
            templateUrl: './categorie-ingredients.page.html',
            styleUrls: ['./categorie-ingredients.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, NavController, ModalController])
    ], CategorieIngredientsPage);
    return CategorieIngredientsPage;
}());
export { CategorieIngredientsPage };
//# sourceMappingURL=categorie-ingredients.page.js.map