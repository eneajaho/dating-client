import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { distinctUntilChanged, tap } from 'rxjs/operators';

export const Themes = {
  Dark: 'dark',
  Light: 'light'
};

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private theme = new BehaviorSubject<string>('');

  public theme$: Observable<string> = this.theme.asObservable().pipe(
    distinctUntilChanged(),
    tap(theme => this.document.body.setAttribute('data-theme', theme))
  );

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Automatically activate dark mode
    this.dark();
  }

  toggle(): void {
    if (this.activeTheme === Themes.Dark) {
      this.light();
    } else {
      this.dark();
    }
  }

  private get activeTheme(): string {
    const themeAttr = this.document.body.attributes.getNamedItem('data-theme')?.value;
    return themeAttr === Themes.Dark ? Themes.Dark : Themes.Light;
  }

  dark(): void {
    this.theme.next(Themes.Dark);
  }

  light(): void {
    this.theme.next(Themes.Light);
  }

}
