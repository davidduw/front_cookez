import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FrigoRempliPage } from './frigo-rempli.page';

const routes: Routes = [
  {
    path: '',
    component: FrigoRempliPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FrigoRempliPage]
})
export class FrigoRempliPageModule {}
