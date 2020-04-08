import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreationRecettePage } from './creation-recette.page';
var CreationRecettePageModule = /** @class */ (function () {
    function CreationRecettePageModule() {
    }
    CreationRecettePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: CreationRecettePage }])
            ],
            declarations: [CreationRecettePage]
        })
    ], CreationRecettePageModule);
    return CreationRecettePageModule;
}());
export { CreationRecettePageModule };
//# sourceMappingURL=creation-recette.module.js.map