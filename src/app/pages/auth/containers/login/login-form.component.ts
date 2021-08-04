import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPayload } from '@auth/models';

@Component({
  selector: 'app-login-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <input type="text" formControlName="username" autocomplete="username"
              [class.is-invalid]="invalid('username')"
              placeholder="Email address" class="form-control">
        <div class="invalid-feedback" *ngIf="invalid('username')">
          <span *ngIf="required('username')">Email is required!</span>
        </div>
      </div>
      <div class="form-group">
        <input type="password" formControlName="password" autocomplete="current-password"
              [class.is-invalid]="invalid('password')"
              placeholder="Password" class="form-control">
        <div class="invalid-feedback" *ngIf="invalid('password')">
          <span *ngIf="required('password')">Password is required!</span>
          <span *ngIf="minLength('password')">Password must have at least 8 characters!</span>
        </div>
      </div>

      <div class="form-group">
          <ng-content select="error-alert"></ng-content>
      </div>

      <div class="submit">
        <button type="submit" class="btn auth-btn btn-primary">
          <span *ngIf="!loading">Login now</span>
          <spinner *ngIf="loading" size="small" color="button" class="mx-2"></spinner>
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

  @Input() loading = false;
  @Output() submitted = new EventEmitter<LoginPayload>();

  form: FormGroup = this.fb.group({
    username: [ '', Validators.required ],
    password: [ '', [ Validators.required, Validators.minLength(8) ] ]
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    if (this.loading) { return; }
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  invalid(control: string): boolean {
    return this.form.get(control)!.touched && this.form.get(control)!.invalid;
  }

  required(control: string): boolean {
    return this.form.get(control)!.hasError('required');
  }

  minLength(control: string): boolean {
    return this.form.get(control)!.hasError('minlength');
  }

}
