import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreationRecetteListePage } from './creation-recette-liste.page';

const routes: Routes = [
  {
    path: '',
    component: CreationRecetteListePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreationRecetteListePage]
})
export class CreationRecetteListePageModule {}
