import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from "@layout/services";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-members-search',
  templateUrl: './members-search.component.html',
  styleUrls: ['./members-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersSearchComponent {

  constructor(private theme: ThemeService, private toast: ToastrService) { }

  theme$ = this.theme.theme$;

  handleSubmit(event) {
    this.toast.info('', "Doesn't function for the moment!");
  }

}
