import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OngletsPageRoutingModule } from './onglets.router.module';

import { OngletsPage } from './onglets.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    OngletsPageRoutingModule
  ],
  declarations: [OngletsPage]
})
export class OngletsPageModule {}
