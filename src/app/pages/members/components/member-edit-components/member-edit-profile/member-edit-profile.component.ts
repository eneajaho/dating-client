import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "@core/models";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromMembers from "@members/store/reducers";
import { takeUntil } from "rxjs/operators";
import { MemberEditPageActions } from "@members/store/actions";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-member-edit-profile',
  templateUrl: './member-edit-profile.component.html',
  styleUrls: [ './member-edit-profile.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberEditProfileComponent implements OnInit, OnDestroy {

  form: FormGroup;
  details: User;

  infoIcon = faInfo;

  private destroy$ = new Subject<boolean>();

  constructor(private store: Store<fromMembers.State>,
              private fb: FormBuilder, private cd: ChangeDetectorRef) {}

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
      .pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.details = data;
      this.patchForm(data);
    });
  }

  patchForm(user: User) {
    this.form.reset();

    const interests = user.interests?.split(/[\s,]+/);

    this.form.patchValue({
      ...user,
      interests: interests,
    });

    this.cd.detectChanges();
  }

  onSubmit() {
    if (this.form.valid && this.formChanged) {
      const interests = this.joinInterests(this.form.get('interests').value);
      const user = { ...this.details, ...this.form.value, interests };
      this.store.dispatch(MemberEditPageActions.editMember({ user }))
    }
  }

  joinInterests(interests) {
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

  // interests = [
  //   { display: 'Dancing', value: 'Danging' },
  //   { display: 'Singing', value: 'Singing' },
  //   { display: 'Sexting', value: 'Sexting' },
  // ]
  //
  // addInterest(interest) {
  //   const interests = [ ...this.form.get('interests').value, interest ];
  //   this.interests = this.interests.filter(item => item.value !== interest.value);
  //   this.form.patchValue({ interests: interests });
  // }

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
