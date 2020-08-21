import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LayoutService } from "@layout/services/layout.service";

@Component({
  selector: 'app-members-search',
  templateUrl: './members-search.component.html',
  styleUrls: ['./members-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersSearchComponent implements OnInit {

  constructor(private layout: LayoutService) { }

  theme$ = this.layout.theme$;

  ngOnInit() {

  }

}
