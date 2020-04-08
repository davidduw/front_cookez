import * as tslib_1 from "tslib";
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
var ModalAddIngredientPage = /** @class */ (function () {
    function ModalAddIngredientPage(modalController, toastController, router) {
        this.modalController = modalController;
        this.toastController = toastController;
        this.router = router;
        this.isShowCreateIngr = false;
    }
    ModalAddIngredientPage.prototype.closeModalAddIngredients = function () {
        this.modalController.dismiss();
    };
    ModalAddIngredientPage.prototype.presentToast = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Ces aliments ont été ajoutés à votre frigo !",
                            duration: 2000,
                            cssClass: "modal_ingr_toast",
                            color: "tertiary"
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        this.goToTheFullFridgePage();
                        this.closeModalAddIngredients();
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalAddIngredientPage.prototype.goToTheFullFridgePage = function () {
        var navigationExtras = {
            state: {
                page: "onglets/categorie-ingredients"
            }
        };
        this.router.navigate(['onglets/frigo-rempli'], navigationExtras);
    };
    ModalAddIngredientPage.prototype.createIngredient = function () {
        this.isShowCreateIngr = true;
    };
    ModalAddIngredientPage.prototype.ngOnInit = function () {
    };
    ModalAddIngredientPage = tslib_1.__decorate([
        Component({
            selector: 'app-modal-add-ingredient',
            templateUrl: './modal-add-ingredient.page.html',
            styleUrls: ['./modal-add-ingredient.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, ToastController, Router])
    ], ModalAddIngredientPage);
    return ModalAddIngredientPage;
}());
export { ModalAddIngredientPage };
//# sourceMappingURL=modal-add-ingredient.page.js.map