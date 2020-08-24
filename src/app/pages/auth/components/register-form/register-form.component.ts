import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Register } from "@auth/models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { passwordValidation } from "@shared/validators";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: [ './register-form.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {

  @Input() loading: boolean;
  @Output() submitted = new EventEmitter<Register>();

  form: FormGroup;
  bsConfig = { dateInputFormat: 'DD/MM/YYYY', containerClass: 'theme-dark-blue' }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [ '', Validators.required ],
      gender: [ 'male', Validators.required ],
      birthday: [ '', Validators.required ],
      knownAs: [ '', Validators.required ],
      city: [ '', Validators.required ],
      country: [ '', Validators.required ],
      password: [ '', [ Validators.required, Validators.minLength(8) ] ],
      confirmPassword: [ '', [ Validators.required, Validators.minLength(8) ] ],
    }, { validators: passwordValidation });
  }

  onSubmit() {
    if (this.form.valid) {
       this.submitted.emit(this.form.value);
    }
  }

  required(control: string): boolean {
    return this.form.get(control).touched &&
      this.form.get(control).invalid &&
      this.form.get(control).errors?.required;
  }

  passwordLength(control: string): boolean {
    return this.form.get(control).touched &&
      this.form.get(control).invalid &&
      this.form.get(control).errors?.minlength;
  }

  valid(control: string): boolean {
    return this.form.get(control).touched && this.form.get(control).valid;
  }

  get passwordsError() {
    return (this.form.touched || this.form.dirty) &&
      this.form.errors?.passwordsDontMatch;
  }


}
