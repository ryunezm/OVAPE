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

  isLinear = true;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  years: number[] = [];
  currentYear: number = new Date().getFullYear();
  selectedYear: number = 2008;
  semester: number = 1;
  password: string = '';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    for (let year = 2008; year <= this.currentYear; year++) {
      this.years.push(year);
    }

    this.firstFormGroup = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
    })

    this.secondFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(5)]]
    })

    this.thirdFormGroup = this.formBuilder.group({
      selectedYear: ['', [Validators.required, Validators.min(2008), Validators.max(this.currentYear)]],
      semester: ['', [Validators.required, Validators.min(1), Validators.max(2)]],
    })

    this.fourthFormGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]]
    })
  }


  ngOnInit(): void {
    // this.firstFormGroup = this.formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this.formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

  onSubmit() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fourthFormGroup.valid) {
      const first_name = this.firstFormGroup.value.first_name;
      const last_name = this.firstFormGroup.value.last_name;
      const email = this.secondFormGroup.value.email;
      const selectedYear = this.thirdFormGroup.value.selectedYear;
      const semester = this.thirdFormGroup.value.semester;
      const password = this.fourthFormGroup.value.password;

      this.authService
        .register(first_name, last_name, email, selectedYear, semester, password)
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
    if (password) {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!strongPasswordRegex.test(password)) {
        return {'passwordStrength': true};
      }
    }
    return null;
  }
}
