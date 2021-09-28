import { TestBed } from '@angular/core/testing';

import { CompraManagementService } from './compra-management.service';

describe('CompraManagementService', () => {
  let service: CompraManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
