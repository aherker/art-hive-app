import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { LoginPageForm } from './login.page.form';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { 

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
  });
  }

  login(){
    this.router.navigate(['homepage']);
  }

  register(){
    this.router.navigate(['register']);
  }

}
