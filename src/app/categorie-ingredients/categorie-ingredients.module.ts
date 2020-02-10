import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategorieIngredientsPage } from './categorie-ingredients.page';

const routes: Routes = [
  {
    path: '',
    component: CategorieIngredientsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategorieIngredientsPage]
})
export class CategorieIngredientsPageModule {}
