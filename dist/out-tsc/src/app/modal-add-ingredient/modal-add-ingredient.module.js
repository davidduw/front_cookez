import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ModalAddIngredientPage } from './modal-add-ingredient.page';
var routes = [
    {
        path: '',
        component: ModalAddIngredientPage
    }
];
var ModalAddIngredientPageModule = /** @class */ (function () {
    function ModalAddIngredientPageModule() {
    }
    ModalAddIngredientPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ModalAddIngredientPage]
        })
    ], ModalAddIngredientPageModule);
    return ModalAddIngredientPageModule;
}());
export { ModalAddIngredientPageModule };
//# sourceMappingURL=modal-add-ingredient.module.js.map