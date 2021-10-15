import { TestBed } from '@angular/core/testing';

import { FacturacionManagementService } from './facturacion-management.service';

describe('FacturacionManagementService', () => {
  let service: FacturacionManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturacionManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
