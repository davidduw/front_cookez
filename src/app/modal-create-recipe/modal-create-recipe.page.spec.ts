import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { ModalCreateRecipePage } from './modal-create-recipe.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

class MockStorage {
  private internal = [];
  public get(key: string): Promise<any> {
    let getval = this.internal[key];
    return new Promise(function (resolve: Function): void {
      resolve(getval);
    });
  }
}

describe('ModalCreateRecipePage', () => {
  let component: ModalCreateRecipePage;
  let fixture: ComponentFixture<ModalCreateRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: Storage, useClass: MockStorage
      },{ provide: Router }, { provide: HttpClient },{ provide: ModalController}],
      declarations: [ ModalCreateRecipePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
