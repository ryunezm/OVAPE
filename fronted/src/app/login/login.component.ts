import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from "../services/api.service";
import {User} from '../services/user.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router,) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    console.log('onSubmit() called');
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.apiService
        .login(username, password)
        .subscribe({
          next: (user: User) =>{
            localStorage.setItem('token', user.token);
            this.router.navigateByUrl('/home').then(() => '/home');
          },
          error: (e) => {
            console.log('Error logging in:', e);
          },
          complete(){
            console.log("completed");
          },
        })
        ;
    }
  }

  ngOnInit(): void {
    // Check token
    const token = localStorage.getItem('token');
    if (token) {
      alert('You have already logged in')
      // -> to /home
      this.router.navigateByUrl('/home').then(() => '/home');
    }
  }
}
