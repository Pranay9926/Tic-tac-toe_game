import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;

    constructor(public formBuilder: FormBuilder,private router: Router,){
     
    }

     ngOnInit() {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      this.loginForm = this.formBuilder.group({
        loginInput: ['', [Validators.required]],
      });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

     async onSubmit() {
      this.submitted = true;

      if(this.loginForm.invalid){
        return;
      }
      localStorage.setItem('dataSource', JSON.stringify(this.loginForm.value));
      this.router.navigate(['join-room']);
      console.log('value==',JSON.stringify(this.loginForm.value))
      this.loginForm.reset();
     }
  
}
