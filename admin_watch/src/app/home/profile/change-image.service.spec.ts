/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChangeImageService } from './change-image.service';

describe('Service: ChangeImage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeImageService]
    });
  });

  it('should ...', inject([ChangeImageService], (service: ChangeImageService) => {
    expect(service).toBeTruthy();
  }));
});
