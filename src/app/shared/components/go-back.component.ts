import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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

  constructor(private location: Location) { }

  back() {
    this.location.back();
  }

}
