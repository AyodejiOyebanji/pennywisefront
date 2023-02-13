import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod'
//  import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  public url = environment.url;
  public userId:any;
  constructor(private http: HttpClient) {}
  signupStOne(userDetails: any) {
    return this.http.post(`${this.url}/signup/infostone`, userDetails);
  }
  getCurrentUser() {
    return JSON.parse(localStorage['email']);
  }
  verifyCode(details: any) {
    return this.http.post(`${this.url}/verifycode`, details);
  }
  personalDetails(data: any, currentUser: any) {
    return this.http.post(`${this.url}/personalDetails/${currentUser}`, data);
  }
  uploadImage(data: any, currentUser: any) {
    return this.http.post(`${this.url}/uploadimage/${currentUser}`, {
      profile_pics: data,
    });
  }

  generateAccountNumber(data: any, currentUser: any) {
    return this.http.post(`${this.url}/genaccountno/${currentUser}`, {
      accountNo: data.accountNo,
      accountBalance:data.accountBalance,
      fundAmount:data.fundAmount,
      totalSpending:data.totalSpending


    });
  }

  getUserDetails(currentUser: any) {
    return this.http.get(`${this.url}/getuser/${currentUser}`);
  }

  setPassword(data:any, currentUser:any){
    return this.http.post(`${this.url}/setpassword/${currentUser}`, {
      password: data,
    });
  }
  login(data: any) {
    return this.http.post(`${this.url}/login`, data);
  }
  dashboard(token:any){
    return this.http.get(`${this.url}/dashboard`,{
      headers:{
        "Authorization":`Bearer ${token} `,
        "Accept":"application/json",
        "content-Type":"application/json"
      }
    })
  }


   fundAccount(fundDetails:any, currentUserEmail: any){
     return this.http.post(`${this.url}/fundaccount/${currentUserEmail}`,{fundDetails})
  }



  getAllUser(currentUser:any){


       return this.http.get(`${this.url}/getAllUsers/${currentUser}`)

  }

  transfer(data:any,userId:any){
    console.log(userId);

    return this.http.post(`${this.url}/transfer/${userId}`,data)

  }
  addGoal(data:any, currentUser:any){


    return this.http.post(`${this.url}/setgoal/${currentUser}`,data)
  }
  getAllGoal(currentUser:any){


    return this.http.get(`${this.url}/getAllGoal/${currentUser}`)
  }

  fundGoal(data:any,currentUser:any){
    console.log(data,currentUser);

    return this.http.post(`${this.url}/fundgoal/${currentUser}`,data)
  }

}
