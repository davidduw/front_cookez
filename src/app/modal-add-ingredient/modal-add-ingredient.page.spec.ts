import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { ModalAddIngredientPage } from './modal-add-ingredient.page';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

class MockStorage {
  private internal = [];
  public get(key: string): Promise<any> {
    let getval = this.internal[key];
    return new Promise(function (resolve: Function): void {
      resolve(getval);
    });
  }
}

describe('ModalAddIngredientPage', () => {
  let component: ModalAddIngredientPage;
  let fixture: ComponentFixture<ModalAddIngredientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: Storage, useClass: MockStorage
      }, { provide: Router }, { provide: HttpClient }, { provide: ModalController}],
      declarations: [ ModalAddIngredientPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddIngredientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
