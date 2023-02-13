import { Component, Input, OnInit } from '@angular/core';
import { UserServicesService } from '../Services/user-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-transfer',
  templateUrl: './confirm-transfer.component.html',
  styleUrls: ['./confirm-transfer.component.css']
})
export class ConfirmTransferComponent implements OnInit {
  public transferdetails:any
  public token:any;
  public response:any
  public userDetails:any
  public tpin=''
  public errorMsg=""
  public loading=false;


  constructor(public userservice:UserServicesService,  private _snackBar: MatSnackBar, public router: Router,) { }

  ngOnInit(): void {
    this.transferdetails=JSON.parse(localStorage['transferdetails']);
    console.log(this.transferdetails)
    this.token=JSON.parse(localStorage['token']);
    this.userservice.dashboard(this.token).subscribe((res)=>{

      this.response=res
      this.userDetails= this.response.result
      console.log(this.userDetails);


    })



  }
  confirm(message: string){
    if(this.tpin==""){
      this._snackBar.open("Kindly fill in your details", 'Close');

    }else if(this.tpin!==this.userDetails.tPin ){


      this._snackBar.open("Incorrect pin", 'Close');


    }
    else if(this.userDetails.accountBalance<this.transferdetails.repamount ){

      this._snackBar.open("Insufficient funds", 'Close');

    }else{
      this.loading=true;
      //To update the remaining balance of the sender
      let senderRemainingAccountBalance = parseFloat( this.userDetails.accountBalance) -  parseFloat(this.transferdetails.repamount)
      let totalSpent=this.userDetails. totalSpending+parseFloat(this.transferdetails.repamount)
      //To update the receiver balance
      let receiverAccountBalance =parseFloat(this.transferdetails.accountBalance) +parseFloat(this.transferdetails.repamount)





      let history={
        sender_first_name: this.userDetails.first_name,
        sender_last_name:this.userDetails.last_name,
        sender_ref_num: Math.floor(Math.random() * 9000000000000000),
        date:new Date(),
        sender_des:"Debit",
        receiver_first_name: this.transferdetails.first_name,
        receiver_last_name:this.transferdetails.last_name,
        receiver_ref_num: Math.floor(Math.random() * 9000000000000000),
        amount:this.transferdetails.repamount,
        reason:this.transferdetails.reason,
        receiver_des:"Credit",
        senderBalance: senderRemainingAccountBalance ,
        receiverBalance: receiverAccountBalance ,
        receiverEmail:this.transferdetails.email,
        totalSpending: totalSpent
      }
      this.userservice.transfer(history,this.userDetails._id).subscribe((res)=>{

        this.response = res;
        if (this.response.status) {
          this._snackBar.open(this.response.message, 'Close');


          this.router.navigate(['/dashboard']);
        }else{
          this._snackBar.open(this.response.message, 'Close');
        }

      })



    }
  }
}
