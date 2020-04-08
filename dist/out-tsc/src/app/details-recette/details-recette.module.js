import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailsRecettePage } from './details-recette.page';
var DetailsRecettePageModule = /** @class */ (function () {
    function DetailsRecettePageModule() {
    }
    DetailsRecettePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: DetailsRecettePage }])
            ],
            declarations: [DetailsRecettePage]
        })
    ], DetailsRecettePageModule);
    return DetailsRecettePageModule;
}());
export { DetailsRecettePageModule };
//# sourceMappingURL=details-recette.module.js.map