import { TestBed } from '@angular/core/testing';

import { SoundFxService } from './sound-fx.service';

describe('SoundFxService', () => {
  let service: SoundFxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundFxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
