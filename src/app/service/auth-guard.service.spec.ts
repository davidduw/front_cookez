import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
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

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
      provide: Storage, useClass: MockStorage
    }, { provide: Router }, { provide: HttpClient }, {
      provide: ActivatedRoute,
      useClass: ActivatedRouteMock
    }
    ],
  }));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
