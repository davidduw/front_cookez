import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { CategorieRecettesPage } from './categorie-recettes.page';
import { Router, ActivatedRoute } from '@angular/router';
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

describe('CategorieRecettesPage', () => {
  let component: CategorieRecettesPage;
  let fixture: ComponentFixture<CategorieRecettesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: Storage, useClass: MockStorage
      }, { provide: Router }, { provide: HttpClient }, { provide: ActivatedRoute}
      ],
      declarations: [ CategorieRecettesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieRecettesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
