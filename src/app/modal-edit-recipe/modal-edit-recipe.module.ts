import { Routes, RouterModule } from '@angular/router';
import { ModalEditRecipePage } from './modal-edit-recipe.page';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalCreateRecipePage } from '../modal-create-recipe/modal-create-recipe.page';

const routes: Routes = [
    {
        path: '',
        component: ModalEditRecipePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ModalEditRecipePage]
})
export class ModalEditRecipePageModule { }
