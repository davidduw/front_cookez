import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OngletsPageRoutingModule } from './onglets.router.module';
import { OngletsPage } from './onglets.page';
var OngletsPageModule = /** @class */ (function () {
    function OngletsPageModule() {
    }
    OngletsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                OngletsPageRoutingModule
            ],
            declarations: [OngletsPage]
        })
    ], OngletsPageModule);
    return OngletsPageModule;
}());
export { OngletsPageModule };
//# sourceMappingURL=onglets.module.js.map