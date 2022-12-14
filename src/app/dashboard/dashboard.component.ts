import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeleteconfirmComponent } from '../deleteconfirm/deleteconfirm.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // deposit variables
  // acno=''
  // psw=''
  // amnt=''
  // withdarwal variables
  // acno1=''
  // psw1=''
  // amnt1=''

  dateandtime:any
  acno:any
  user=''

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router){ 

    // date nem time nem access cheyan
    
    this.dateandtime=new Date()
    
    // accessing username

    this.user=this.ds.currentuser

  }


  depositForm=this.fb.group({acno:['', [Validators.required, Validators.pattern('[0-9]+')]],
                              psw:['', [Validators.required, Validators.pattern('[0-9]+')]],
                              amnt:['',[Validators.required, Validators.pattern('[0-9]+')]]
                            })

  withdrawForm=this.fb.group({acno1:['',[Validators.required, Validators.pattern('[0-9]+')]],
                              psw1:['',[Validators.required, Validators.pattern('[0-9]+')]],
                              amnt1:['',[Validators.required, Validators.pattern('[0-9]+')]]
                            })


  ngOnInit(){

    if(!localStorage.getItem('currentacno')){
      alert('please login first')
      this.router.navigateByUrl('')
    }

  }
                    

  deposit(){
    var acno=this.depositForm.value.acno
    var psw=this.depositForm.value.psw
    var amnt=this.depositForm.value.amnt

    if(this.depositForm.valid){

      const result= this.ds.deposit(acno,psw,amnt)

    if(result){
      alert(`${amnt} credited to your acc and the balance is ${result}`)
    }
    else{
      alert('incorrect username or password')
    }

  }
    
  }

  withdraw(){
    var acno1=this.withdrawForm.value.acno1
    var psw1=this.withdrawForm.value.psw1
    var amnt1=this.withdrawForm.value.amnt1

    if(this.withdrawForm.valid){

      const result = this.ds.withdraw(acno1,psw1,amnt1)

    if(result){
      alert(`${amnt1} is debited and the balance is ${result}`)
    }

    }
  }

  logout(){
    localStorage.removeItem('currentuser')
    localStorage.removeItem('currentacno')
 this.router.navigateByUrl('')

  }

  deleteconfirm(){
 this.acno=JSON.parse(localStorage.getItem('currentacno') || '')
  }

}

