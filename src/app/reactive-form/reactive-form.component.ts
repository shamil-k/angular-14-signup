import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  Validators,
  FormGroup,
  NonNullableFormBuilder,
  FormControl,
} from '@angular/forms';
import { UserRegistration, UserTypes } from '../models/userRegistration';
import { CustomvalidationService } from '../services/customvalidation.service';
import { UserNameValidationService } from '../services/user-name-validation.service';
import Valid from './validator';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  getToday(): string {
    console.log(
      'hello',
      new Date(new Date().setFullYear(new Date().getFullYear() - 15))
        .toISOString()
        .split('T')[0]
    );
    return new Date(new Date().setFullYear(new Date().getFullYear() - 15))
      .toISOString()
      .split('T')[0];
  }

  protected userList: Array<UserTypes> = [];
  protected registerForm: FormGroup;
  protected submitted = false;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly customValidator: CustomvalidationService,
    private readonly userNameValidationService: UserNameValidationService
  ) {}

  // mobileNum: new FormControl("",Validators.required),
  // firstName: new FormControl("", Validators.required),
  // secondName:new FormControl("",Validators.required),
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        mobNum: new FormControl(null, [
          Validators.required,
          Validators.pattern('[0-9]{10}'),
        ]),
        gender: new FormControl('male', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Valid?.lowerCase ? Valid?.lowerCase : null,
          Valid?.upperCase ? Valid?.upperCase : null,
          Valid?.specialContains ? Valid?.specialContains : null,
          Valid?.minChar ? Valid?.minChar : null,
          Valid?.numberCase ? Valid?.numberCase : null,
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        terms: new FormControl(false, [Validators.requiredTrue]),
        dateOfBirth: new FormControl('', Validators.required),
      },
      {
        validators: [
          this.customValidator.matchPassword('password', 'confirmPassword'),
        ],
      }
    );
  }

  protected get registerFormControl() {
    return this.registerForm.controls;
  }

  protected onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      var f_name = this.registerForm.value.firstName;
      var l_name = this.registerForm.value.lastName;
      var email = this.registerForm.value.email;
      var password = this.registerForm.value.password;
      var gender = this.registerForm.value.gender;
      var mobnum = this.registerForm.value.mobNum;
      var dob = this.registerForm.value.dateOfBirth;
      this.userList.push({
        firstName: f_name,
        lastName: l_name,
        email: email,
        password: password,
        gender: gender,
        mobNum: mobnum,
        dateofbirth: dob,
      });

      console.log(this.registerForm.value);
    }
  }
  get f() {
    return this.registerForm.controls;
  }
  protected resetForm(): void {
    this.registerForm.reset();
  }
}
