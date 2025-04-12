import { TestBed } from '@angular/core/testing';

import { FormRootServiceService } from './form-root-service.service';

describe('FormRootServiceService', () => {
  let service: FormRootServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormRootServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
