import { Router } from '@angular/router';
import { AccountService } from './../../account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private service: AccountService, private rout:Router) { }
  listFeedBack: any;
  p=1;
  ngOnInit() {
    this.checkLogin();
    this.getAllFeedback();
  }
  checkLogin(){
    if(!localStorage.getItem('userInfo')){
      this.rout.navigate(['login']);
    }
  }

  getAllFeedback(){
    this.service.getAllContact().subscribe(res=> {
      this.listFeedBack = res;
    })
  }
}
