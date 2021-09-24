import { TestBed } from '@angular/core/testing';

import { ProyeccionManagementService } from './proyeccion-management.service';

describe('ProyeccionManagementService', () => {
  let service: ProyeccionManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyeccionManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
