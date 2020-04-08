import * as tslib_1 from "tslib";
import { ModalController, ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var ModalCreateRecipePage = /** @class */ (function () {
    function ModalCreateRecipePage(modalController, toastController, router) {
        this.modalController = modalController;
        this.toastController = toastController;
        this.router = router;
    }
    ModalCreateRecipePage.prototype.closeModal = function () {
        this.modalController.dismiss();
    };
    ModalCreateRecipePage.prototype.presentToast = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: "Votre recette a bien été enregistrée !",
                            duration: 2000,
                            cssClass: "modal_create_recipe_toast",
                            color: "tertiary"
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        this.goToTheListOfRecipesCreatedPage();
                        this.closeModal();
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalCreateRecipePage.prototype.goToTheListOfRecipesCreatedPage = function () {
        var navigationExtras = {
            state: {
                page: "onglets/accueil-recette"
            }
        };
        this.router.navigate(['onglets/creation-recette-liste'], navigationExtras);
    };
    ModalCreateRecipePage.prototype.ngOnInit = function () {
    };
    ModalCreateRecipePage = tslib_1.__decorate([
        Component({
            selector: 'app-modal-create-recipe',
            templateUrl: './modal-create-recipe.page.html',
            styleUrls: ['./modal-create-recipe.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, ToastController, Router])
    ], ModalCreateRecipePage);
    return ModalCreateRecipePage;
}());
export { ModalCreateRecipePage };
//# sourceMappingURL=modal-create-recipe.page.js.map