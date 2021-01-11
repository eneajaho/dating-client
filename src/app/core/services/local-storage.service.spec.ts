import { TestBed } from "@angular/core/testing";
import { LocalStorageService } from "@core/services/local-storage.service";

describe('Local Storage Service', () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });
});
