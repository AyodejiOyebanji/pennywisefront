import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info-step-one',
  templateUrl: './info-step-one.component.html',
  styleUrls: ['./info-step-one.component.css']
})
export class InfoStepOneComponent implements OnInit {
  public vericode=0
  public errorMsg=""
  public currentUser:any
  public  response:any
  public message:any
  public loading=false;
  constructor(

    public userService: UserServicesService, public router:Router,
    private _snackBar: MatSnackBar

  ) {}
  ngOnInit(): void {
    this.currentUser= this.userService.getCurrentUser()


  }
  next(message: string){
    if(this.vericode==0){
      this._snackBar.open("Kindly fill in the input field", 'Close');

    }else{
      this.loading=true
      let details= {currentUser:this.currentUser, code:this.vericode}
      this.userService.verifyCode(details).subscribe(res=>{
        this.response=res
        if(this.response.status){
          this._snackBar.open(this.response.message, 'Close');

          this.router.navigate(['signup/personalinformation'])

        }else{
          this.loading=false
          this._snackBar.open(this.response.message, 'Close');

        }



      })



    }
  }

}
