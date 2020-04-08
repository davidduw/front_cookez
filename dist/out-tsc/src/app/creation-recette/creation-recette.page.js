import * as tslib_1 from "tslib";
import { ModalController, NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { ModalCreateRecipePage } from '../modal-create-recipe/modal-create-recipe.page';
var CreationRecettePage = /** @class */ (function () {
    function CreationRecettePage(nav, modalController) {
        this.nav = nav;
        this.modalController = modalController;
    }
    CreationRecettePage.prototype.openModalCreateRecipe = function () {
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
    CreationRecettePage = tslib_1.__decorate([
        Component({
            selector: 'app-creation-recette',
            templateUrl: 'creation-recette.page.html',
            styleUrls: ['creation-recette.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NavController, ModalController])
    ], CreationRecettePage);
    return CreationRecettePage;
}());
export { CreationRecettePage };
//# sourceMappingURL=creation-recette.page.js.map