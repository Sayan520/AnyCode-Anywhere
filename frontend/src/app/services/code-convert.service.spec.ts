import { TestBed } from '@angular/core/testing';

import { CodeConvertServiceTsService } from './code-convert.service';

describe('CodeConvertServiceTsService', () => {
  let service: CodeConvertServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeConvertServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
