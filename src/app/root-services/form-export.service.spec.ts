import { TestBed } from '@angular/core/testing';

import { FormExportService } from './form-export.service';

describe('FormExportService', () => {
  let service: FormExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
