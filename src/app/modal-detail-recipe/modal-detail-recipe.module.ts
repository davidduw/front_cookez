import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalDetailRecipePage } from './modal-detail-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetailRecipePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalDetailRecipePage]
})
export class ModalDetailRecipePageModule {}
