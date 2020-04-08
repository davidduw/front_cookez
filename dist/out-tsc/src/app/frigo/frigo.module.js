import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FrigoPage } from './frigo.page';
var FrigoPageModule = /** @class */ (function () {
    function FrigoPageModule() {
    }
    FrigoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: FrigoPage }])
            ],
            declarations: [FrigoPage]
        })
    ], FrigoPageModule);
    return FrigoPageModule;
}());
export { FrigoPageModule };
//# sourceMappingURL=frigo.module.js.map