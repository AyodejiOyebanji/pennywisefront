import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  public repamount:any;
  public repAccNum:any;
  public reason:any;
  public errorMsg='';
  public token:any;
  public response:any
  public userId:any;
  public userEmail:any
  public allUsers:any;
  public getReceiver:any;
  public accountMsg=""
  public transferObj:any
  public loading=false;





  constructor(public userService:UserServicesService, public router:Router) { }

  ngOnInit(): void {
    this.token= JSON.parse(localStorage['token']);
    this.userService.dashboard(this.token).subscribe((res)=>{
      this.response=res;
    })
    this.userEmail= JSON.parse(localStorage['email']);

    this.userService.getAllUser(this.userEmail).subscribe((res)=>{
    this.response=res
    this.allUsers=this.response.users

    })





  }
  searchAccount(){

     this.getReceiver= this.allUsers.find((val:any)=>val.accountNo==this.repAccNum)
     this.loading=false


     if(!this.getReceiver){
      this.accountMsg="Invalid account number"
      this.loading=false
     }

  }
  transfer(){

    if(this.repAccNum==""&& this.repamount=="" &&this.reason==""){
      this.errorMsg="Please kindly input the field"

    }else if(this.repAccNum==""|| this.repamount==""|| this.reason==""){
      this.errorMsg="Please fill up the missing field"
    }else{
      this.loading=true
      this.transferObj={
        repAccNum:this.repAccNum,
        repamount:this.repamount,
        reason: this.reason,
        first_name: this.getReceiver.first_name,
        last_name: this.getReceiver.last_name,
        accountBalance: this.getReceiver.accountBalance,
        email: this.getReceiver.email,


      }
      localStorage.setItem("transferdetails", JSON.stringify(this.transferObj))

        this.router.navigate(["/dashboard/confirmtransfer"])


    }

  }

}

