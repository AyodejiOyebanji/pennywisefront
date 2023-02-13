import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../Services/user-services.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css']
})
export class SetpasswordComponent implements OnInit {
  public errorMsg=""
  public password=""
  public cpass=''
  public currentUser:any
  public response:any
  public loading=false;

  constructor(public userService:UserServicesService, public router:Router,  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.currentUser= this.userService.getCurrentUser()
    console.log(this.currentUser)
  }
  finish(message: string){
    if(this.password=="" && this.cpass==""){

      this._snackBar.open("Fill the Input", 'Close');
    }else if(this.password=="" && this.cpass==""){

      this._snackBar.open("Fill the missing details", 'Close');
    }else if(this.password.length<6){

      this._snackBar.open("Your password must be greater than 6", 'Close');

    }else if(this.password!= this.cpass){

      this._snackBar.open("Password Not match", 'Close');
    }else{
      this.loading=true
      this.userService.setPassword(this.password,this.currentUser).subscribe((res)=>{
        this.response=res

        if(this.response.status){
          this._snackBar.open(this.response.message, 'Close');

          localStorage.removeItem("email")
         this.router.navigate(["/login"])

        }else{
          this.loading=false
          this._snackBar.open(this.response.message, 'Close');
        }

      })




    }

  }

}
