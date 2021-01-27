import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '@auth/models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [ './login-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {

  @Input() loading = false;
  @Output() submitted = new EventEmitter<Credentials>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [ '', Validators.required ],
      password: [ '', [ Validators.required, Validators.minLength(8) ] ]
    });
  }

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
