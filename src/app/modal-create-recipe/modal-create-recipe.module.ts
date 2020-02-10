import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalCreateRecipePage } from './modal-create-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCreateRecipePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalCreateRecipePage]
})
export class ModalCreateRecipePageModule {}
