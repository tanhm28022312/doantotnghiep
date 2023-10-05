import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from './../../account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Account } from '../Account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  listAcc: any;
  formLogin!: FormGroup;
  constructor(
    private route: Router,
    private service: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadAcc();
  }
  buildForm() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  loadAcc() {
    this.service.getAllAccount().subscribe((res) => {
      this.listAcc = res;
    });
  }
  login() {
    let check = false;
    for (let i in this.listAcc) {
      if (
        this.listAcc[i].email == this.formLogin.value.email &&
        this.listAcc[i].password == this.formLogin.value.password
      ) {
        localStorage.setItem('userInfo', JSON.stringify(this.formLogin.value));
        check = true;
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Đăng nhập thành công!',
          showConfirmButton: false,
          timer: 12000,
        });
        localStorage.setItem('userInfo', JSON.stringify(this.listAcc[i]));
        this.route.navigate(['']);
        window.location.href = 'http://localhost:8000';
      }
    }
    if (!check) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sai email hoặc mật khẩu!',
      
      });
    }
  }
}
