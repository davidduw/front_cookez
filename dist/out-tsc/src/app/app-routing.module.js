import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './onglets/onglets.module#OngletsPageModule' },
    { path: 'onglets/categorie/', loadChildren: './categorie-recettes/categorie-recettes.module#CategorieRecettesPageModule' },
    { path: 'user-info', loadChildren: './user-info/user-info.module#UserInfoPageModule' },
    { path: 'onglets', loadChildren: './onglets/onglets.module#OngletsPageModule' },
    { path: 'details-recette', loadChildren: './details-recette/details-recette.module#DetailsRecettePageModule' },
    { path: 'categorie-ingredients', loadChildren: './categorie-ingredients/categorie-ingredients.module#CategorieIngredientsPageModule' },
    { path: 'creation-recette-liste', loadChildren: './creation-recette-liste/creation-recette-liste.module#CreationRecetteListePageModule' },
    { path: 'frigo-rempli', loadChildren: './frigo-rempli/frigo-rempli.module#FrigoRempliPageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map