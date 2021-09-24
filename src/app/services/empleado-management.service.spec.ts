import { TestBed } from '@angular/core/testing';

import { EmpleadoManagementService } from './empleado-management.service';

describe('EmpleadoManagementService', () => {
  let service: EmpleadoManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
