import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { AccueilRecettePage } from './accueil-recette.page';
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

describe('AccueilRecettePage', () => {
  let component: AccueilRecettePage;
  let fixture: ComponentFixture<AccueilRecettePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: Storage, useClass: MockStorage
      }, { provide: Router }, { provide: HttpClient }
      ],
      declarations: [AccueilRecettePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilRecettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
