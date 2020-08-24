import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { User } from "@core/models";

import * as fromSettings from "@settings/store/reducers";
import { SettingsActions } from "@settings/store/actions";

@Component({
  selector: 'app-member-edit-profile',
  templateUrl: './member-edit-profile.component.html',
  styleUrls: [ './member-edit-profile.component.scss' ],
})
export class MemberEditProfileComponent implements OnInit, OnDestroy {

  form: FormGroup;
  details: User;

  formChanged$ = new BehaviorSubject(false);
  savingChanges$: Observable<boolean>;

  private destroy$ = new Subject<boolean>();

  constructor(private store: Store<fromSettings.State>, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.handleFormChanges();
    this.updateFormData();

    this.savingChanges$ = this.store.select(fromSettings.selectUserDetailsSavingChanges);
  }

  initForm() {
    this.form = this.fb.group({
      knownAs: [ '', Validators.required ],
      city: '',
      country: '',
      interests: '',
      introduction: ''
    });
  }

  handleFormChanges() {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        // console.log(data);
        this.formChanged$.next(this.form.touched && this.form.dirty);
      });
  }

  updateFormData() {
    this.store.select(fromSettings.selectUserDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.details = data;
        if (data !== null) {
          this.patchForm(data);
        }
      });
  }

  onChipChange() { this.formChanged$.next(true); }

  onSubmit() {
    if (this.form.valid && this.formChanged) {
      const interests = this.joinInterests(this.form.get('interests').value);
      const user = { ...this.details, ...this.form.value, interests };
      this.store.dispatch(SettingsActions.editAuthDetails({ user }));
      this.formChanged$.next(false);
    }
  }

  private patchForm(user: User) {
    this.form.reset();

    let interests = [];
    if (user.interests?.length > 0) {
      interests = user.interests?.split(/[\s,]+/);
    }

    this.form.patchValue({
      ...user,
      interests: interests,
    });
  }

  private joinInterests(interests) {
    const newArray = [];
    for (let interest of interests) {
      if (newArray.includes(interest)) { continue; }
      if (typeof interest === "string") {
        newArray.push(interest);
      } else if (typeof interest === "object") {
        newArray.push(interest.value);
      }
    }
    return newArray.join(',');
  }

  required(control: string): boolean {
    return this.form.get(control).touched && this.form.get(control).invalid;
  }

  get formChanged() { return this.formChanged$.value; }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
