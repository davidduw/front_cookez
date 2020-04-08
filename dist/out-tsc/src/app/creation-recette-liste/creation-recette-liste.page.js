import * as tslib_1 from "tslib";
import { NavController, ModalController } from '@ionic/angular';
import { Component } from '@angular/core';
import { ModalCreateRecipePage } from '../modal-create-recipe/modal-create-recipe.page';
var CreationRecetteListePage = /** @class */ (function () {
    function CreationRecetteListePage(nav, modalController) {
        this.nav = nav;
        this.modalController = modalController;
    }
    CreationRecetteListePage.prototype.openModalCreateRecipe = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: ModalCreateRecipePage
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreationRecetteListePage.prototype.ngOnInit = function () {
    };
    CreationRecetteListePage = tslib_1.__decorate([
        Component({
            selector: 'app-creation-recette-liste',
            templateUrl: './creation-recette-liste.page.html',
            styleUrls: ['./creation-recette-liste.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, ModalController])
    ], CreationRecetteListePage);
    return CreationRecetteListePage;
}());
export { CreationRecetteListePage };
//# sourceMappingURL=creation-recette-liste.page.js.map