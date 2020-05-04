import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { CategorieRecettesPage } from './categorie-recettes.page';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


class MockStorage {
  private internal = [];
  public get(key: string): Promise<any> {
    let getval = this.internal[key];
    return new Promise(function (resolve: Function): void {
      resolve(getval);
    });
  }
}

class ActivatedRouteMock {
  queryParams = new Observable(observer => {
    const urlParams = {
      param1: 'some',
      param2: 'params'
    }
    observer.next(urlParams);
    observer.complete();
  });
}

describe('CategorieRecettesPage', () => {
  let component: CategorieRecettesPage;
  let fixture: ComponentFixture<CategorieRecettesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [{
        provide: Storage, useClass: MockStorage
      }, { provide: Router }, { provide: HttpClient }, {
        provide: ActivatedRoute,
        useClass: ActivatedRouteMock
      }
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
