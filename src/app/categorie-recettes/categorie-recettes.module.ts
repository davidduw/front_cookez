import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategorieRecettesPage } from './categorie-recettes.page';
import { IonicStorageModule } from '@ionic/storage';


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
    IonicStorageModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [CategorieRecettesPage]
})
export class CategorieRecettesPageModule {}
