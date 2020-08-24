import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "@core/models";
import { Observable, Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";

import * as fromSettings from "@settings/store/reducers";
import { SettingsActions } from "@settings/store/actions";

@Component({
  selector: 'app-member-edit-account',
  templateUrl: './member-edit-account.component.html',
  styleUrls: [ './member-edit-account.component.scss' ],
})
export class MemberEditAccountComponent implements OnInit, OnDestroy {

  form: FormGroup;
  details: User;

  private destroy$ = new Subject<boolean>();

  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromSettings.State>,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: [ '', Validators.required ],
    //  birthday: [ '', Validators.required ]
    });

    this.store.select(fromSettings.selectUserDetails)
      .pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.details = data;
      this.patchForm(data);
    });

    this.loading$ = this.store.select(fromSettings.selectUserDetailsLoading);
    this.error$ = this.store.select(fromSettings.selectUserDetailsError);
  }

  patchForm(user: User) {
    this.form.reset();

    this.form.patchValue({
      ...user,
      username: user.username,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const user = { ...this.details, ...this.form.value };
      this.store.dispatch(SettingsActions.editAuthDetails({ user }))
    }
  }

  required(control: string): boolean {
    return this.form.get(control).touched && this.form.get(control).invalid;
  }

  get formChanged() {
    return this.form.touched && this.form.dirty;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
