import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserInfoPage } from './user-info.page';
var routes = [
    {
        path: '',
        component: UserInfoPage
    }
];
var UserInfoPageModule = /** @class */ (function () {
    function UserInfoPageModule() {
    }
    UserInfoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UserInfoPage]
        })
    ], UserInfoPageModule);
    return UserInfoPageModule;
}());
export { UserInfoPageModule };
//# sourceMappingURL=user-info.module.js.map