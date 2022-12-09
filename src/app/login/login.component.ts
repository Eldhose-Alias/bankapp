import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  aim="Your Perfect Banking partner"
  data="Account number"
  acno=''
  password=''
  userDetails:any={
    1000:{acnumber:1000,username:"anna",password:123,balance:0},
    1001:{acnumber:1001,username:"anu",password:1234,balance:0},
    1002:{acnumber:1002,username:"manu",password:1235,balance:0},
    1003:{acnumber:1003,username:"arun",password:1236,balance:0}
  }

  constructor(private router:Router ,private ds:DataService){
  
  }

  login(){
   var acno=this.acno
   var psw=this.password
   
   const result=this.ds.login(acno,psw)
    if(result){
      alert('Login Success')
      this.router.navigateByUrl('dashborad')
    }

    else{
      alert('incorrect username or password')
    }
 
}
}
