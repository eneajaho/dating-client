import { TestBed } from '@angular/core/testing';
import { Themes, ThemeService } from './theme.service';

describe('ThemeService', () => {
  let themeService: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ThemeService ]
    });
    themeService = TestBed.inject(ThemeService);
  });

  describe('dark() method', () => {
    it('should change the theme to dark', done => {
      themeService.dark();
      themeService.theme$.subscribe(theme => {
        expect(theme).toBe(Themes.Dark);
        expect(theme).not.toBe(Themes.Light);
        done();
      })
    });
  });

  describe('light() method', () => {
    it('should change the theme to light', done => {
      themeService.light();
      themeService.theme$.subscribe(theme => {
        expect(theme).toBe(Themes.Light);
        expect(theme).not.toBe(Themes.Dark);
        done();
      })
    });
  });

  describe('toggle() method', () => {
    it('should toggle the theme between light and dark', done => {
      // by default we set the theme to dark
      // if we call toggle() method then the theme should be set to light
      spyOn(themeService, 'activeTheme').and.returnValue(Themes.Dark);
      themeService.toggle();
      themeService.theme$.subscribe(theme => {
        expect(theme).toBe(Themes.Light);
        expect(theme).not.toBe(Themes.Dark);
        done();
      })
    });
  });


});
