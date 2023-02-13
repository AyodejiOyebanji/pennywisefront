import { Component, OnInit } from '@angular/core';
import { UserServicesService } from '../Services/user-services.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMsg:any=""
  public email:any="";
  public password:any="";
  public response:any;
  public loading=false;

  constructor(public userService:UserServicesService, public router:Router,    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  next(message: string){
    if(this.email==""&& this.password==""){

      this._snackBar.open("Please enter your details", 'Close');

    }else if(this.email==""|| this.password==""){

      this._snackBar.open("Please enter the missing details", 'Close');



    }else{
      this.loading=true
      let data={
        email:this.email,
       password: this.password

      }
      this.userService.login(data).subscribe((res)=>{
        this.response=res;
        console.log(this.response)
        if(this.response.status){

          this._snackBar.open(this.response.message, 'Close');


          localStorage.setItem("token",JSON.stringify(this.response.token))
          localStorage.setItem("email",JSON.stringify( this.email))
          this.router.navigate([`/dashboard`])


        }else{
          this.loading=false
          this._snackBar.open(this.response.message, 'Close');

        }


      })


    }

  }

}
