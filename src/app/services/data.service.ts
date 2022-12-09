import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentuser=' '
  currentacno=''

  constructor() { }
   
  userDetails:any={
    1000:{acnumber:1000,username:"Anna",password:123,balance:0,transaction:[]},
    1001:{acnumber:1001,username:"Anu",password:1234,balance:0,transaction:[]},
    1002:{acnumber:1002,username:"Manu",password:1235,balance:0,transaction:[]},
    1003:{acnumber:1003,username:"Arun",password:1236,balance:0,transaction:[]}
  }

  register(acno:any,uname:any,psw:any){
    var userDetails=this.userDetails

    if(acno in userDetails){
      return false
    }
    else{
      userDetails[acno] = {acno,username:uname,password:psw,balance:0,transaction:[]}
      console.log(userDetails);
      
      return true 
    }
    
  }
 
  login(acno:any,psw:any){
    var userDetails=this.userDetails
     if(acno in userDetails ){
  
       if(psw == userDetails[acno]["password"]){

        // accnumber
        this.currentacno=acno

        // store username 
        this.currentuser = userDetails[acno]["username"]
        return true

       }
       else{
         return false
       }
     }
     else{
       return false
       }
    
    }

  deposit(acno:any,password:any,amount:any){
    var userDetails=this.userDetails
    var amnt=parseInt(amount)
    if(acno  in userDetails){
      if(password==userDetails[acno]["password"]){
        userDetails[acno]["balance"]+=amnt

        userDetails[acno]["transaction"].push({type:'CREDIT',amount:amnt})

        return userDetails[acno]["balance"]
      }
      else{
        return false
      }
    }
    else{
      return false
    }
  }

  withdraw(acno:any,password:any,amount:any){
    var userDetails=this.userDetails
    var amnt=parseInt(amount)
    if(acno in userDetails){
      if(password==userDetails[acno]["password"]){
        if(amnt<=userDetails[acno]["balance"]){
          userDetails[acno]["balance"]-=amnt

          userDetails[acno]["transaction"].push({type:'DEBIT',amount:amnt})

          return userDetails[acno]["balance"]

        }
        else{
          alert('insufficient balance')
          return false
        }
      }
      else{
        alert('incorrect password')
        return false
      }
    }
    else{
      alert('incorrect acc no')
      return false
    }
  }

  gettransaction(acno:any){

    return this.userDetails[acno]["transaction"]

  }

}


