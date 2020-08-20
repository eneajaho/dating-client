import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "@core/models";
import { Observable, Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import * as fromMembers from "@members/store/reducers";
import { MemberEditPageActions } from "@members/store/actions";

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

  constructor(private store: Store<fromMembers.State>,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: [ '', Validators.required ],
    //  birthday: [ '', Validators.required ]
    });

    this.store.select(fromMembers.selectSelectedMember)
      .pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.details = data;
      this.patchForm(data);
    });

    this.loading$ = this.store.select(fromMembers.selectMemberLoading);
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
      this.store.dispatch(MemberEditPageActions.editMember({ user }))
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
