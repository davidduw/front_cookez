import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategorieIngredientsPage } from './categorie-ingredients.page';
var routes = [
    {
        path: '',
        component: CategorieIngredientsPage
    }
];
var CategorieIngredientsPageModule = /** @class */ (function () {
    function CategorieIngredientsPageModule() {
    }
    CategorieIngredientsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CategorieIngredientsPage]
        })
    ], CategorieIngredientsPageModule);
    return CategorieIngredientsPageModule;
}());
export { CategorieIngredientsPageModule };
//# sourceMappingURL=categorie-ingredients.module.js.map