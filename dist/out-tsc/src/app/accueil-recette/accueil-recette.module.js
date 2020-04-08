import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccueilRecettePage } from './accueil-recette.page';
import { IonicStorageModule } from '@ionic/storage';
var AccueilRecettePageModule = /** @class */ (function () {
    function AccueilRecettePageModule() {
    }
    AccueilRecettePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                IonicStorageModule.forRoot(),
                RouterModule.forChild([{ path: '', component: AccueilRecettePage }])
            ],
            declarations: [AccueilRecettePage]
        })
    ], AccueilRecettePageModule);
    return AccueilRecettePageModule;
}());
export { AccueilRecettePageModule };
//# sourceMappingURL=accueil-recette.module.js.map