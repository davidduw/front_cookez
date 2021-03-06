import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'onglets/categorie/', loadChildren: './categorie-recettes/categorie-recettes.module#CategorieRecettesPageModule' },
  { path: 'user-info', loadChildren: './user-info/user-info.module#UserInfoPageModule' },
  { path: 'onglets', loadChildren: './onglets/onglets.module#OngletsPageModule' },
  { path: 'details-recette', loadChildren: './details-recette/details-recette.module#DetailsRecettePageModule' },
  { path: 'categorie-ingredients', loadChildren: './categorie-ingredients/categorie-ingredients.module#CategorieIngredientsPageModule' },
  { path: 'creation-recette-liste', loadChildren: './creation-recette-liste/creation-recette-liste.module#CreationRecetteListePageModule' },
  { path: 'frigo-rempli', loadChildren: './frigo-rempli/frigo-rempli.module#FrigoRempliPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PageRoutingModule {}
