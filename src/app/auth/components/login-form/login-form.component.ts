import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Login } from "../../models/Login.model";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Input() loading: boolean;
  @Output() login = new EventEmitter<Login>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });
  }

  submit() {
    this.login.emit(this.form.value);
  }

  isRequired(control: string) {
    return this.form.get(control).touched && this.form.get(control).invalid;
  }

}
