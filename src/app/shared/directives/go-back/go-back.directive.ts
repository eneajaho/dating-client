import { Directive, HostListener, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

@Directive({ selector: '[goBack]' })
export class GoBackDirective {

  @Input() route: string;

  constructor(private location: Location, private router: Router) { }

  @HostListener('click')
  back() {
    if (this.route) {
      this.router.navigate([ this.route ]);
    } else {
      this.location.back();
    }
  }

}
