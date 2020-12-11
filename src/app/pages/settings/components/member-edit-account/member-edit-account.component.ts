import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "@core/models";
import { BehaviorSubject, Observable, Subject } from "rxjs";
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

  form: FormGroup = this.fb.group({
    username: [ '', Validators.required ],
    gender: [ '', Validators.required ],
    //  birthday: [ '', Validators.required ]
  });

  details?: User = undefined;

  formChanged$ = new BehaviorSubject(false);

  private destroy$ = new Subject<boolean>();

  loading$ = this.store.select(fromSettings.selectUserDetailsSavingChanges);
  error$ = this.store.select(fromSettings.selectUserDetailsError);

  constructor(private store: Store<fromSettings.State>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.handleFormChanges();
  }

  getUserDetails(): void {
    this.store.select(fromSettings.selectUserDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.details = data;
        this.patchForm(data);
      });
  }

  handleFormChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(x => {
        this.formChanged$.next(this.form.dirty);
      });
  }

  patchForm(user: User): void {
    this.form.reset();

    this.form.patchValue({
      ...user,
      username: user.username,
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const user = { ...this.details, ...this.form.value };
      this.store.dispatch(SettingsActions.editAuthDetails({ user }));
      this.formChanged$.next(false);
    }
  }

  required(control: string): boolean {
    return (this.form.get(control)?.touched && this.form.get(control)?.invalid) ?? false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
