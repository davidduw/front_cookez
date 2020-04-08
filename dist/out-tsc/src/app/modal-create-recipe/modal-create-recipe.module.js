import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalCreateRecipePage } from './modal-create-recipe.page';
var routes = [
    {
        path: '',
        component: ModalCreateRecipePage
    }
];
var ModalCreateRecipePageModule = /** @class */ (function () {
    function ModalCreateRecipePageModule() {
    }
    ModalCreateRecipePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ModalCreateRecipePage]
        })
    ], ModalCreateRecipePageModule);
    return ModalCreateRecipePageModule;
}());
export { ModalCreateRecipePageModule };
//# sourceMappingURL=modal-create-recipe.module.js.map