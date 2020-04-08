import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FrigoRempliPage } from './frigo-rempli.page';
var routes = [
    {
        path: '',
        component: FrigoRempliPage
    }
];
var FrigoRempliPageModule = /** @class */ (function () {
    function FrigoRempliPageModule() {
    }
    FrigoRempliPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FrigoRempliPage]
        })
    ], FrigoRempliPageModule);
    return FrigoRempliPageModule;
}());
export { FrigoRempliPageModule };
//# sourceMappingURL=frigo-rempli.module.js.map