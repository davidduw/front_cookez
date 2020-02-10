import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategorieRecettesPage } from './categorie-recettes.page';

const routes: Routes = [
  {
    path: '',
    component: CategorieRecettesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategorieRecettesPage]
})
export class CategorieRecettesPageModule {}
