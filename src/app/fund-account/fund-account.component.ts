import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../Services/user-services.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fund-account',
  templateUrl: './fund-account.component.html',
  styleUrls: ['./fund-account.component.css']
})
export class FundAccountComponent implements OnInit {
  public fundAccountAmount:any= 0;
  public isDisabled=true;
  public errorMsg="";
  public currentUser:any;
  public token:any;
  public response:any;
  public fundDetails:any;
  public currentUserEmail:any;
  public fundRes:any;
  public fundAmount:any;
  public accountBalance:any;
  public loading=false;
  constructor(public userService:UserServicesService,public router:Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage['token']);

     this.currentUser=this.userService.dashboard(this.token).subscribe((res)=>{
        this.response=res;
        console.log(this.response.result);
      this.fundAmount=this.response.result.fundAmount
      this.accountBalance=this.response.result.accountBalance
      console.log(this.fundAmount);


     })




  }
  fundMe(message: string){

    let totalFunded = parseFloat( this.fundAmount) + parseInt(this.fundAccountAmount)
    let totalBal =parseFloat(this.accountBalance) + parseInt(this.fundAccountAmount)
    if(this.fundAccountAmount==0){

      this._snackBar.open("Please enter an amount", 'Close');


} else if(this.fundAccountAmount>20000){


  this._snackBar.open("Your amount is greater than #20,000:00", 'Close');

}
else if(this.fundAccountAmount<=20000){
  this.loading=true
  this.fundDetails={
    amount:this.fundAccountAmount,
    trasactiontype:"Credit",
    ref_no: Math.floor(Math.random() * 9000000000000000),
    date: new Date(),
    description:"Self Credit",
    fundAmount: totalFunded,
    accountBalance:totalBal


  }


  this.currentUserEmail=this.response.result.email

  this.userService.fundAccount(this.fundDetails,this.currentUserEmail).subscribe(res=>{
      this.fundRes=res;
      if(this.fundRes.status){
        this._snackBar.open(this.fundRes.message, 'Close');

        this.router.navigate(["/dashboard"])


      }else{
        this.loading=false
        this._snackBar.open(this.fundRes.message, 'Close');
      }


  })










    }
  }
}
