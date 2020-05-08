import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Photo, User } from "@core/models";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromMembers from "@members/store/reducers";
import { takeUntil } from "rxjs/operators";
import { MemberEditPageActions } from "@members/store/actions";

@Component({
  selector: 'app-member-edit-profile',
  templateUrl: './member-edit-profile.component.html',
  styleUrls: ['./member-edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberEditProfileComponent implements OnInit {


  form: FormGroup;
  details: User;

  private destroy$ = new Subject<boolean>();

  constructor(private store: Store<fromMembers.State>, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      knownAs: [ '', Validators.required ],
      city: '',
      country: '',
      gender: [ '', Validators.required ],
      interests: '',
      introduction: ''
    });

    this.store.select(fromMembers.selectSelectedMember)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.details = data;
        this.patchForm(data);
      });

  }

  patchForm(user: User) {
    this.form.patchValue({
      knownAs: user.knownAs,
      city: user.city,
      country: user ? user.country : '',
      gender: user.gender,
      interests: user.interests,
      introduction: user.introduction,
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const user = { ...this.details, ...this.form.value };
      console.log(user);
      this.store.dispatch(MemberEditPageActions.editMember({ user }))
    }
  }

  required(control: string): boolean {
    return this.form.get(control).touched && this.form.get(control).invalid;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
