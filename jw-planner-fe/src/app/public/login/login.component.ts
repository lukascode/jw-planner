import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from './login.model';
import { AuthService } from 'src/app/security/auth.service';
import { Utils } from 'src/app/shared/utils/utils';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  isProgressActive = false;
  isPasswordHidden = true;
  isLoginFailed = false;
  loginFailedErrorDescription = '';

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private alert: AlertService
    ) {
    this.createForm(formBuilder);
  }

  private createForm(formBuilder: FormBuilder): void {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.isLoginFailed = false;
    this.loginFailedErrorDescription = '';
    if (this.loginForm.valid) {
      this.isProgressActive = true;
      this.auth.login(
        new UserCredentials(this.loginForm.value.email, this.loginForm.value.password),
      ).subscribe(email => {
        this.isProgressActive = false;
        console.log(`User '${email}' logged in successfully`);
        this.router.navigate(['dashboard']);
        this.alert.success('Zalogowano pomyślnie');
      }, (err: HttpErrorResponse) => {
        setTimeout(() => {
          this.isProgressActive = false;
          this.isLoginFailed = true;
          if (err.status === 401) {
            this.loginFailedErrorDescription = 'Niepoprawne dane uwierzytelniania lub konto zablokowane.';
          } else if (err.status >= 500) {
            this.loginFailedErrorDescription = 'Problem po stronie serwera. Sprawdź połączenie.';
          } else {
            this.loginFailedErrorDescription = 'Wystąpił niespodziewany błąd.';
          }
        }, 500);
      });
    } else {
      Utils.markAllTouched(this.loginForm);
    }
  }
}
