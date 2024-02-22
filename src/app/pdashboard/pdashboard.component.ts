import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../Services/user-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var google: any;

@Component({
  selector: 'app-pdashboard',
  templateUrl: './pdashboard.component.html',
  styleUrls: ['./pdashboard.component.css'],
})
export class PDashboardComponent implements OnInit {
  public usertoken: any;
  showFiller = false;
  public currentTime: any;
  public greetings: any;
  public response: any;
  public errorMsg: any;
  public userDetails: any;
  public history: any;
  public goalAmount: any;
  public goal: any;
  public goaldate: any;
  public goalMsg = '';
  public goalResponse: any;
  public userGoals: any;
  public eachGoalAmount: any;
  public goalIndex: any;
  public userEmail: any;
  public allGoalRes: any;
  public responsetwo:any

  constructor(public router: Router, public userService: UserServicesService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // google chart
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChartPie);

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChartArea);

    this.usertoken = JSON.parse(localStorage['token']);

    if (!this.usertoken) {
      this.router.navigate(['/login']);
    }
  
    this.userEmail = JSON.parse(localStorage['email']);
    //GET THE USER'S GOAL
    this.userService.getAllGoal(this.userEmail).subscribe((res) => {
      this.allGoalRes = res;

      if (this.allGoalRes.status) {
        this.userGoals = this.allGoalRes.allGoal;
      }
    });
    this.fetchUserDetails()
    this.currentTime = new Date().getHours();

    if (this.currentTime < 12) {
      this.greetings = 'Good Morning';
    } else if (this.currentTime >= 12 && this.currentTime <= 17) {
      this.greetings = 'Good Afternoon';
    } else if (this.currentTime >= 17 && this.currentTime <= 24) {
      this.greetings = 'Good Evening';
    }
  }
  fetchUserDetails(){
    this.userService.dashboard(this.usertoken).subscribe((res) => {
      this.response = res;
      console.log(this.response);
      if (this.response.status) {
        this.userDetails = this.response.result;
        this.history = this.response.result.history;
      }
    });

  }
  drawChartPie() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 10],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2],
    ]);
    var chart = new google.visualization.PieChart(
      document.getElementById('divPieChart')
    );
    chart.draw(data, null);
  }

  drawChartArea() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 8],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2],
    ]);
    var chart = new google.visualization.AreaChart(
      document.getElementById('divAreaChart')
    );
    chart.draw(data, null);
  }

  saveGoal(message: string) {
    if (this.goal == '' && this.goalAmount == '' && this.goaldate == '') {
      this.goalMsg = 'Kindly fill up the field';
    } else if (
      this.goal == '' ||
      this.goalAmount == '' ||
      this.goaldate == ''
    ) {
      this.goalMsg = 'Kindly fill up the missing  field';
    } else {
      let goalObj = {
        userEmail: this.userDetails.email,
        goal: this.goal,
        goalAmount: this.goalAmount,
        goalsavedamount: 0,
        deadline: this.goaldate,
        goalId: Math.floor(Math.random() * 90000),
      };
      this.userService
        .addGoal(goalObj, this.userDetails.email)
        .subscribe((res) => {
          this.goalResponse = res;

          if (this.goalAmount.status) {
            this.goalMsg = this.goalResponse.message;
            console.log(this.goalMsg);

            this._snackBar.open(this.goalMsg, 'Close');
            console.log(this.goalResponse.message);
          }
        });
    }
    window.location.reload();
  }

  addMoneyToGoalIndex(i: any) {
    this.goalIndex = i;
    console.log(i);
  }
  addMoneyToGoal() {
    let goalAmount = this.userGoals[this.goalIndex].goalsavedamount;

    let goalId = this.userGoals[this.goalIndex]._id;

    if (this.eachGoalAmount == '') {
      this.errorMsg = 'Kindly fill in your goal amount';
    } else if (goalAmount === 0) {
      let accountBalance =
        parseFloat(this.userDetails.accountBalance) -
        parseFloat(this.eachGoalAmount);
      console.log(accountBalance);
      let eachGoalObj = {
        goalAmount: this.eachGoalAmount,
        accountBalance: accountBalance,
        currentUserEmail: this.userDetails.email,
      };
      this.userService.fundGoal(eachGoalObj, goalId).subscribe((res) => {
         this.responsetwo = res
         if(this.responsetwo.status){
          this._snackBar.open(this.responsetwo.message, 'Close');
          this.fetchUserDetails()
          // this.router.navigate(["/goalfunded"])
          this.eachGoalAmount=''
         }



      });
    } else if (goalAmount > 0) {
      let totalGoalAmount =
        parseFloat(goalAmount) + parseFloat(this.eachGoalAmount);
      let accountBalance =
        parseFloat(this.userDetails.accountBalance) -
        parseFloat(this.eachGoalAmount);
      let eachGoalObj = {
        goalAmount: totalGoalAmount,
        accountBalance: accountBalance,
        currentUserEmail: this.userDetails.email,
      };
      this.userService.fundGoal(eachGoalObj, goalId).subscribe((res) => {
        this.responsetwo = res
        if(this.responsetwo.status){
           this.fetchUserDetails()
           this.eachGoalAmount=''
         this._snackBar.open(this.responsetwo.message, 'Close');
        //  this.router.navigate(["dashboard/goalfunded"])
        }
      });
    }
  }
}
