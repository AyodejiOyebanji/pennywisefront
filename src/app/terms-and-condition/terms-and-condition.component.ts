import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.css'],
})
export class TermsAndConditionComponent implements OnInit {
  public accountNumber: any;
  public currentUser: any;
  public errorMsg = '';
  public response: any;
  public loading=false;
  constructor(
    public userService: UserServicesService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  agree(message: string) {
    this.loading=true
    this.accountNumber = '213' + Math.floor(1000000 + Math.random() * 900000);
    let userDetails = {
      accountNo: this.accountNumber,
      accountBalance: 0,
      fundAmount: 0,
      totalSpending: 0,
    };


    this.userService
      .generateAccountNumber(userDetails, this.currentUser)
      .subscribe((res) => {
        this.response = res;
        if (this.response.status) {
          this._snackBar.open(this.response.message, 'Close');
           this.router.navigate(['/welcome'])
        } else {
          this.loading=false
          this._snackBar.open(this.response.message, 'Close');
        }
      });
  }
}
