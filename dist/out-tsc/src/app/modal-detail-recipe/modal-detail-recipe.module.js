import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalDetailRecipePage } from './modal-detail-recipe.page';
var routes = [
    {
        path: '',
        component: ModalDetailRecipePage
    }
];
var ModalDetailRecipePageModule = /** @class */ (function () {
    function ModalDetailRecipePageModule() {
    }
    ModalDetailRecipePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ModalDetailRecipePage]
        })
    ], ModalDetailRecipePageModule);
    return ModalDetailRecipePageModule;
}());
export { ModalDetailRecipePageModule };
//# sourceMappingURL=modal-detail-recipe.module.js.map