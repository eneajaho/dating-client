import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, Validators } from "@angular/forms";
import { fadeIdAnimation } from "@shared/animations";
import { MembersFilter } from "@core/models";

type Sections = 'age' | 'gender' | 'lastActive';

@Component({
  selector: 'app-members-search-form',
  templateUrl: './members-search-form.component.html',
  styleUrls: [ './members-search-form.component.scss' ],
  animations: [ fadeIdAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersSearchFormComponent implements OnInit {

  @Input() theme: string = 'dark';
  @Input() activeFilters: MembersFilter | null = null;
  @Output() submitted = new EventEmitter<MembersFilter>();

  searchIcon = faSearch;

  private activeStates: Sections[] = [ 'age', 'gender', 'lastActive' ];
  active: Sections = 'age';

  form = this.fb.group({
    minAge: [ '', [ Validators.min(18), Validators.max(99) ] ],
    maxAge: [ '', [ Validators.min(18), Validators.max(99) ] ],
    gender: '',
    lastActive: ''
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.activeFilters) {
      this.form.patchValue(this.activeFilters);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.submitted.emit(this.form.value);
    }
  }

  next(): void {
    const currentActiveIndex = this.activeStates.indexOf(this.active);
    this.active = this.activeStates[(currentActiveIndex + 1) % 3];
  }

  invalid(control: string): boolean {
    return (this.form.get(control)?.touched && this.form.get(control)?.invalid) ?? false;
  }

}
