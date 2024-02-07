import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  isLinear = false;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  //yearControl: FormControl = new FormControl();
  years: number[] = [];
  currentYear: number = new Date().getFullYear();
  selectedYear: number = this.currentYear;
  semester: number = 0;
  password: string = '';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    for (let year = this.currentYear; year >= 2009; year--) {
      this.years.push(year);
    }

    this.firstFormGroup = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇç\s'-]+$/), Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñÇç\s'-]+$/), Validators.minLength(3)]],
    })

    this.secondFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@unicartagena.edu.co$/)]]
    })

    this.thirdFormGroup = this.formBuilder.group({
      yearControl: ['', [Validators.required, Validators.min(2008), Validators.max(this.currentYear)]],
      semester: ['', [Validators.required, Validators.min(1), Validators.max(2)]],
    })

    this.fourthFormGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
      //password: ['', [Validators.required, this.passwordStrengthValidator.bind(this)]]
    })
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

  //TODO
  onSubmit() {
    console.log('onSubmit called');
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fourthFormGroup.valid) {
      const first_name = this.firstFormGroup.value.first_name;
      const last_name = this.firstFormGroup.value.last_name;
      const email = this.secondFormGroup.value.email;
      const yearControl = this.thirdFormGroup.value.yearControl;
      const semester = this.thirdFormGroup.value.semester;
      const password = this.fourthFormGroup.value.password;

      this.authService
        .register(first_name, last_name, email, yearControl, semester, password)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/home').then(() => '/home');
          },
          error: err => {
            console.log(err);
            this.snackBar.open
            ("Error while registering. Please try again.",
              "Close",
              {duration: 3000,})
          },
          complete: () => {
            console.log("Complete")
          }
        })
    }
  }

  private passwordStrengthValidator(control: AbstractControl) {
    const password = control.value;
    if (!password) {
      return null; // No error if the field is empty.
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      return { 'passwordStrength': true };
    }

    return null; // No error, the password meets the requirements.
  }

  passwordTooltip(): string {
    const passwordControl = this.fourthFormGroup.get('password');

    // @ts-ignore
    if (passwordControl.hasError('required')) {
      return 'Password is required';
    }
    // @ts-ignore
    if (passwordControl.hasError('passwordStrength')) {
      return 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character, with a minimum length of 8 characters.';
    }

    return '';
  }
}
