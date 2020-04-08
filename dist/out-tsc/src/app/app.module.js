import * as tslib_1 from "tslib";
import { ModalCreateRecipePageModule } from './modal-create-recipe/modal-create-recipe.module';
import { CategorieIngredientsPageModule } from './categorie-ingredients/categorie-ingredients.module';
import { ModalAddIngredientPageModule } from './modal-add-ingredient/modal-add-ingredient.module';
import { ModalDetailRecipePageModule } from './modal-detail-recipe/modal-detail-recipe.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent],
            entryComponents: [],
            imports: [BrowserModule,
                HttpModule,
                HttpClientModule,
                IonicModule.forRoot(),
                AppRoutingModule,
                ModalDetailRecipePageModule,
                ModalAddIngredientPageModule,
                CategorieIngredientsPageModule,
                ModalCreateRecipePageModule
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map