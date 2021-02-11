import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@core/models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { selectUserSettingsState, SettingsState } from '@settings/store/reducers';
import { editUserSettings } from '@settings/store/actions/settings.actions';

@Component({
  selector: 'app-member-edit-account',
  templateUrl: './member-edit-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberEditAccountComponent implements OnInit, OnDestroy {

  form: FormGroup = this.fb.group({
    username: [ '', Validators.required ],
    gender: [ '', Validators.required ],
    //  birthday: [ '', Validators.required ]
  });

  formChanged$ = new BehaviorSubject(false);

  vm$ = this.store.select(selectUserSettingsState).pipe(
    tap(s => this.patchForm(s.user))
  );

  private sub?: Subscription;

  constructor(private store: Store<SettingsState>, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.sub = this.form.valueChanges.subscribe(() => {
      this.formChanged$.next(this.form.dirty);
    });
  }

  patchForm(user: User): void {
    this.form.reset();

    this.form.setValue({
      username: user.username,
      gender: user.gender
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    this.store.dispatch(editUserSettings({ userData: this.form.value }));
    this.formChanged$.next(false);
  }

  required(control: string): boolean {
    return (this.form.get(control)?.touched && this.form.get(control)?.invalid) ?? false;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
