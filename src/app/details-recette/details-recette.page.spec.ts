import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { DetailsRecettePage } from './details-recette.page';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

describe('DetailsRecettePage', () => {
  let component: DetailsRecettePage;
  let fixture: ComponentFixture<DetailsRecettePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [{
        provide: Storage, useClass: MockStorage
      },{ provide: Router }, { provide: HttpClient },{
        provide: ActivatedRoute,
        useClass: ActivatedRouteMock
      }, { provide: ModalController}
      ],
      declarations: [DetailsRecettePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRecettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
