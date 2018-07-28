import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../environments/environment";
import { Validators, FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {
  appName = environment.appName;
  copyright = environment.copyright;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.authService.isLogined()) {
      this.router.navigate(['dashboard']);
    }

    this.loginForm = this.fb.group({
      'rememberMe': new FormControl(true),
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  public login(form) {
    if (this.authService.login(form.username, form.password)) {
      this.router.navigate(['dashboard']);
    } else {
      this.snackBar.open('用户名或密码错误', '登录失败', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }

    // if (form.username === 'demo@cscec.com') {
    //   if (this.authService.loginDemo(form.username, form.password)) {
    //     this.msgs = [];
    //     this.msgs.push({severity: 'success', detail: 'Login success.'});
    //     this.router.navigate(['robot']);
    //   } else {
    //     this.msgs = [];
    //     this.msgs.push({severity: 'error', detail: 'Incorrect username or password.'});
    //   }
    //
    //   return;
    // }
    //
    // this.authService.login(form.username, form.password).subscribe(
    //   data => {
    //     this.msgs = [];
    //     this.msgs.push({severity: 'success', detail: 'Login success.'});
    //     this.router.navigate(['robot']);
    //   },
    //   err => {
    //     this.msgs = [];
    //     this.msgs.push({severity: 'error', detail: 'Incorrect username or password.'});
    //   }
    // );
  }

}
