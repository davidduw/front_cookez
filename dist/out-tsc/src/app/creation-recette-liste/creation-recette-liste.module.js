import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreationRecetteListePage } from './creation-recette-liste.page';
var routes = [
    {
        path: '',
        component: CreationRecetteListePage
    }
];
var CreationRecetteListePageModule = /** @class */ (function () {
    function CreationRecetteListePageModule() {
    }
    CreationRecetteListePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CreationRecetteListePage]
        })
    ], CreationRecetteListePageModule);
    return CreationRecetteListePageModule;
}());
export { CreationRecetteListePageModule };
//# sourceMappingURL=creation-recette-liste.module.js.map