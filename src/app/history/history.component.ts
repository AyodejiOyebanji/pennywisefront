import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public usertoken: any;
  public history: any;
  public response: any;
  constructor(public router: Router, public userService: UserServicesService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.usertoken = JSON.parse(localStorage['token']);
    
    if (!this.usertoken) {
      this.router.navigate(['/login']);
    }
    this.fetchUserDetails()
  }
  fetchUserDetails(){
    this.userService.dashboard(this.usertoken).subscribe((res) => {
      this.response = res;
 
      if (this.response.status) {

      
        this.history = this.response.result.history;
      }
    });

  }

}
