import { TestBed } from '@angular/core/testing';

import { FormVariablesService } from './form-variables.service';

describe('FormVariablesService', () => {
  let service: FormVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
