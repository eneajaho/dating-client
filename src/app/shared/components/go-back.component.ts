import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";

@Component({
  selector: 'go-back',
  template: `
    <button (click)="back()" class="btn btn-light">
      <fa-icon [icon]="backIcon" class="mr-1"></fa-icon>
      Go back
    </button>
  `
})
export class GoBackComponent {

  backIcon = faArrowLeft;

  @Input() route: string;

  constructor(private location: Location, private router: Router) { }

  back() {
    if (this.route) {
      this.router.navigate([this.route]);
    } else {
      this.location.back();
    }
  }

}
