import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OngletsPage } from './onglets.page';
var routes = [
    {
        path: 'onglets',
        component: OngletsPage,
        children: [
            {
                path: 'accueil-recette',
                children: [
                    {
                        path: '',
                        loadChildren: '../accueil-recette/accueil-recette.module#AccueilRecettePageModule'
                    },
                ]
            },
            {
                path: 'categorie',
                children: [
                    {
                        path: '',
                        loadChildren: '../categorie-recettes/categorie-recettes.module#CategorieRecettesPageModule'
                    },
                ]
            },
            {
                path: 'details-recette',
                children: [
                    {
                        path: '',
                        loadChildren: '../details-recette/details-recette.module#DetailsRecettePageModule'
                    },
                ]
            },
            {
                path: 'creation-recette',
                children: [
                    {
                        path: '',
                        loadChildren: '../creation-recette/creation-recette.module#CreationRecettePageModule'
                    }
                ]
            },
            {
                path: 'creation-recette-liste',
                children: [
                    {
                        path: '',
                        loadChildren: '../creation-recette-liste/creation-recette-liste.module#CreationRecetteListePageModule'
                    },
                ]
            },
            {
                path: 'frigo',
                children: [
                    {
                        path: '',
                        loadChildren: '../frigo/frigo.module#FrigoPageModule'
                    }
                ]
            },
            {
                path: 'frigo-rempli',
                children: [
                    {
                        path: '',
                        loadChildren: '../frigo-rempli/frigo-rempli.module#FrigoRempliPageModule'
                    }
                ]
            },
            {
                path: 'favoris',
                children: [
                    {
                        path: '',
                        loadChildren: '../favoris/favoris.module#FavorisPageModule'
                    }
                ]
            },
            {
                path: 'categorie-ingredients',
                children: [
                    {
                        path: '',
                        loadChildren: '../categorie-ingredients/categorie-ingredients.module#CategorieIngredientsPageModule'
                    }
                ]
            },
            {
                path: 'user-info',
                children: [
                    {
                        path: '',
                        loadChildren: '../user-info/user-info.module#UserInfoPageModule'
                    },
                ]
            },
            {
                path: '',
                redirectTo: '/onglets/accueil-recette',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/onglets/accueil-recette',
        pathMatch: 'full'
    }
];
var OngletsPageRoutingModule = /** @class */ (function () {
    function OngletsPageRoutingModule() {
    }
    OngletsPageRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forChild(routes)
            ],
            exports: [RouterModule]
        })
    ], OngletsPageRoutingModule);
    return OngletsPageRoutingModule;
}());
export { OngletsPageRoutingModule };
//# sourceMappingURL=onglets.router.module.js.map