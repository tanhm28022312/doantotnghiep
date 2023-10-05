import { ChangeImageService } from './profile/change-image.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:any;
  check:any;
  checkLogout:any;
  defaultUrlImage = 'user.png';
  constructor(
    private rout:Router
    ) { }

  ngOnInit(): void {
    this.loadUser();
  }
  loadUser()
 {
  let tem=localStorage.getItem('userInfo');  
  if(tem==null)
  {
    this.check=true;
  }
  else{
    this.check=false;
    this.user=tem!=null?JSON.parse(tem):[];
    this.checkLogout=true;
  }
 }
 logout()
 {
  localStorage.removeItem('userInfo');
  this.user=false;
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'Đăng xuất thành công!',
    showConfirmButton: false,
    timer: 1500
  })
  this.check=true;
  this.checkLogout=false;
  this.loadUser();
  this.rout.navigate(['/login']);
 }
 shop()
 {
  const url = `http://localhost:4200`;
  window.open(url,'_blank'); 
}
}
