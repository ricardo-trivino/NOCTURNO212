import { TestBed } from '@angular/core/testing';

import { ServicioNocturnoService } from './servicio-nocturno.service';

describe('ServicioNocturnoService', () => {
  let service: ServicioNocturnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioNocturnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
