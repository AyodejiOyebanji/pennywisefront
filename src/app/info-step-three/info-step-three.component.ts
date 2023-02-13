import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info-step-three',
  templateUrl: './info-step-three.component.html',
  styleUrls: ['./info-step-three.component.css'],
})
export class InfoStepThreeComponent implements OnInit {
  public myFile: any;

  public filename: any;
  public convertedImage:any="";
  public dispImage: any;
  public currentUser:any
  public errorMsg=""
  public response:any
  public loading=false;

  constructor(private userService:UserServicesService, public router:Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (!this.convertedImage) {
      this.dispImage = '../../assets/avater2-removebg-preview.png';
    }
    this.currentUser=this.userService.getCurrentUser()
  }
  getImage(event: any) {
    this.myFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.myFile);
    reader.onload = () => {
      this.convertedImage = reader.result;
      this.dispImage = this.convertedImage;
    };
  }

  next(message: string){

    if(this.convertedImage==""){

     this._snackBar.open("Kindly upload an Image", 'Close');
    }else{
      this.loading=true

      this.userService.uploadImage(this.convertedImage,this.currentUser).subscribe((res)=>{
        this.response=res
        if(this.response.status){
          this._snackBar.open(this.response.message, 'Close');
          this.router.navigate(["/termsandcondi"])

        }else{
          this.loading=false
          this._snackBar.open(this.response.message, 'Close');
        }

      })


    }




  }
}
