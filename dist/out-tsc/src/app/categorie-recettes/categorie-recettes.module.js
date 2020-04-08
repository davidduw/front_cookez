import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategorieRecettesPage } from './categorie-recettes.page';
var routes = [
    {
        path: '',
        component: CategorieRecettesPage
    }
];
var CategorieRecettesPageModule = /** @class */ (function () {
    function CategorieRecettesPageModule() {
    }
    CategorieRecettesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CategorieRecettesPage]
        })
    ], CategorieRecettesPageModule);
    return CategorieRecettesPageModule;
}());
export { CategorieRecettesPageModule };
//# sourceMappingURL=categorie-recettes.module.js.map