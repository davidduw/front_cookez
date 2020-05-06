import { ModalCreateRecipePageModule } from './modal-create-recipe/modal-create-recipe.module';
import { ModalEditRecipePageModule } from './modal-edit-recipe/modal-edit-recipe.module';
import { CategorieIngredientsPageModule } from './categorie-ingredients/categorie-ingredients.module';
import { ModalAddIngredientPageModule } from './modal-add-ingredient/modal-add-ingredient.module';
import { ModalDetailRecipePageModule } from './modal-detail-recipe/modal-detail-recipe.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    ModalDetailRecipePageModule, 
    ModalAddIngredientPageModule, 
    CategorieIngredientsPageModule, 
    ModalCreateRecipePageModule,
    ModalEditRecipePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicStorageModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
