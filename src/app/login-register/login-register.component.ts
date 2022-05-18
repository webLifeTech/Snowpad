import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  loginForm: any = {
    mobileNo: '',
    password: ''
  }

  resisterForm: any = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    whatsNo: '',
    password: ''
  }

  isLoginForm: boolean = true;
  constructor(
    public api: ApiService,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }
  onSubmit(login: any) {
    console.log(">>>>>>>>>>>", login);
  }
  changeForm() {
    this.isLoginForm = !this.isLoginForm
  }

  signIn() {
    this.api.post('login-user', this.loginForm).then((res: any) => {
      console.log(" res['res']>>", res);
      if (res.status) {
        localStorage.setItem('swowpadUser', JSON.stringify(res['data']));
        this.router.navigate(['/home']);
      } else {
        console.log("Error>>>>>>>>");
      }
    })
  }
  signUp(registerForm: any) {
    console.log("registerForm>>>", registerForm);
    if (registerForm.valid) {
      this.api.post('add-user', this.resisterForm).then((res: any) => {
        console.log(" res['res']>>", res);
        if (res.status) {
          this.isLoginForm = true;
        } else {
          console.log("Error>>>>>>>>");
        }
      })
    } else {
      console.log("Error>>>>>>>>");
    }
  }

  formReset() {
    this.loginForm = {
      mobileNo: '',
      password: ''
    }

    this.resisterForm = {
      firstName: '',
      lastName: '',
      email: '',
      mobileNo: '',
      whatsNo: '',
      password: ''
    }
  }

}
