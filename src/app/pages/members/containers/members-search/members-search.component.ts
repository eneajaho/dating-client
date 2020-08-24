import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LayoutService } from "@layout/services/layout.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-members-search',
  templateUrl: './members-search.component.html',
  styleUrls: ['./members-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersSearchComponent implements OnInit {

  constructor(private layout: LayoutService, private toast: ToastrService) { }

  theme$ = this.layout.theme$;

  ngOnInit() {
  }

  handleSubmit(event) {
    this.toast.info('', "Doesn't function for the moment!");
  }

}
