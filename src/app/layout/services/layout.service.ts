import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { DOCUMENT } from "@angular/common";

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class LayoutService {

  private theme = new BehaviorSubject<Theme>('light');
  public theme$: Observable<Theme> = this.theme.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) { }

  toggle() {
    if (this.activeTheme === "dark") {
      this.light();
    } else {
      this.dark();
    }
  }

  private get activeTheme() {
    return this.document.body.attributes.getNamedItem('data-theme') ? 'dark' : 'light';
  }

  public dark() {
    this.setNavbarTheme('dark');
    this.document.body.setAttribute('data-theme', 'dark');

  }

  public light() {
    this.setNavbarTheme('light');
    this.document.body.removeAttribute('data-theme');
  }

  private setNavbarTheme(type: Theme) {
    this.theme.next(type);
    if (type === "dark") {
      this.document.body.classList.add("dark-theme");
    } else {
      this.document.body.classList.remove("dark-theme");
    }
  }

}
