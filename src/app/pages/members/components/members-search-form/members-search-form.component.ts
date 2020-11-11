import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-members-search-form',
  templateUrl: './members-search-form.component.html',
  styleUrls: ['./members-search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersSearchFormComponent implements OnInit {

  searchIcon = faSearch;

  @Input() theme: string = 'dark';
  @Output() submitted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted.emit(true);
  }

}
