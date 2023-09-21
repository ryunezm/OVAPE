import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  loginForm: FormGroup;
  username: string = '';
  password: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      const username = this.loginForm.value._username;
      const password = this.loginForm.value._password;
      // Aquí puedes agregar la lógica para autenticar al usuario
      // Realiza la autenticación aquí y maneja el flujo de acuerdo a la autenticación exitosa o fallida
    }
  }

}
