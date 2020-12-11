import { inject, InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { ThemeService } from "@layout/services";

export type ThemeProvider = Observable<string>;

export const THEME = new InjectionToken<ThemeProvider>(
  'Active theme', {
    factory(): ThemeProvider {
      const themeService = inject(ThemeService);
      return themeService.theme$;
    }
  }
);
