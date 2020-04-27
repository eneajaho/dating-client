import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {

  @Input() loading: boolean;
  @Output() submitted = new EventEmitter<{ username: string, password: string }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });
  }

  onSubmit() {
    this.submitted.emit(this.form.value);
  }

  isRequired(control: string) {
    return this.form.get(control).touched && this.form.get(control).invalid;
  }

}
