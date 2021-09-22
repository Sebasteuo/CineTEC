import { TestBed } from '@angular/core/testing';

import { SalaManagementService } from './sala-management.service';

describe('SalaManagementService', () => {
  let service: SalaManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
