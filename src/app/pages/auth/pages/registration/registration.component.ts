import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";

import {markFormGroupTouched, regex, regexErrors} from "@app/shared";
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import {Observable} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush //Prevent the page from rendering too often
})
export class RegistrationComponent implements OnInit {

  regexErrors = regexErrors;
  form: FormGroup;
  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromUser.getLoading));

    this.form = this.fb.group({
      email: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.maxLength(128),
          Validators.pattern(regex.email)
        ]
      }],
      password: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern(regex.password)
        ]
      }],
      passwordRepeat: [null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern(regex.password)
        ]
      }]
    }, {validators: this.repeatPasswordValidator})
  }

  private repeatPasswordValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password');
    const passwordRepeat = group.get('passwordRepeat');

    return passwordRepeat.value && password.value !== passwordRepeat.value ? {repeat: true} : null;
  }

  onSubmit(): void {
    if(this.form.valid){
      const value = this.form.value;
      const credentials: fromUser.EmailPasswordCredentials = {
        email: value.email,
        password: value.password
      };
      this.store.dispatch(new fromUser.SignUpEmail(credentials));
    } else {
      markFormGroupTouched(this.form);
    }
  }

}
