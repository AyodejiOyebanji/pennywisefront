import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserServicesService } from '../Services/user-services.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  public userPvn: any;
  public response: any;
  public errorMsg = '';
  public loading=false;
  constructor(
    private _formBuilder: FormBuilder,
    public userService: UserServicesService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  public firstUserForm = this._formBuilder.group({
    first_name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    last_name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    email: ['', [Validators.required, Validators.email]],
    phonenumber: ['', [Validators.required, Validators.minLength(11)]],
  });

  ngOnInit(): void {}

  next(message: string) {
    this.userPvn = Math.floor(Math.random() * 90000);
    this.loading=true
    let userDetails = {
      ...this.firstUserForm.value,
      confirm_code: this.userPvn,
    };
    this.userService.signupStOne(userDetails).subscribe(
      (res) => {
        this.response = res;

        if (this.response.status) {
          this._snackBar.open(this.response.message, 'Close');
          localStorage.setItem(
            'email',
            JSON.stringify(this.firstUserForm.value.email)
          );

          this.router.navigate(['/signup/verification']);
        } else {
          this.loading=false
          this._snackBar.open(this.response.message, 'Close');
        }
      },
      (error) => {
        
        this.loading=false
        this._snackBar.open(error, 'Close');
      }
    );
  }
}
