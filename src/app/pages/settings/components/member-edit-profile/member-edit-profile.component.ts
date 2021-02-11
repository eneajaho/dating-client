import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from '@core/models';

import { selectUserSettingsState, SettingsState } from '@settings/store/reducers';
import { editUserSettings } from '@settings/store/actions/settings.actions';

@Component({
  selector: 'app-member-edit-profile',
  templateUrl: './member-edit-profile.component.html',
  styleUrls: [ './member-edit-profile.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberEditProfileComponent implements OnInit, OnDestroy {

  form: FormGroup = this.fb.group({
    knownAs: [ '', Validators.required ],
    city: '',
    country: '',
    interests: '',
    introduction: ''
  });

  formChanged$ = new BehaviorSubject(false);

  vm$ = this.store.select(selectUserSettingsState).pipe(
    tap(s => this.patchForm(s.user))
  );

  private sub?: Subscription;

  constructor(private store: Store<SettingsState>, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.sub = this.form.valueChanges.subscribe(() => {
      this.formChanged$.next(this.form.dirty);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
    if (this.form.valid && this.formChanged$.value) {
      const interests = this.joinInterests(this.form.get('interests')?.value);
      const userData = { ...this.form.value, interests };
      this.store.dispatch(editUserSettings({ userData }));
      this.formChanged$.next(false);
    }
  }

  private patchForm(user: User) {
    this.form.reset();

    let { knownAs, city, country, interests, introduction } = user;

    const splitInterests: string[] = interests?.split(/[\s,]+/) ?? [];

    this.form.setValue({
      knownAs, city, country, introduction, interests: splitInterests
    });
  }

  private joinInterests(interests: any[]) {
    const newArray: string[] = [];
    for (const interest of interests) {
      if (newArray.includes(interest)) {
        continue;
      }
      if (typeof interest === 'string') {
        newArray.push(interest);
      } else if (typeof interest === 'object') {
        newArray.push(interest.value);
      }
    }
    return newArray.join(',');
  }

  required(control: string): boolean {
    return (this.form.get(control)?.touched && this.form.get(control)?.invalid) ?? false;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
