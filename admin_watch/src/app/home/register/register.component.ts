import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from './../../account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Account } from '../Account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  acc = new Account();
  listAcc: any;
  registerForm!: FormGroup;
  checkExistedEmail: boolean = false;
  checkRepeatePass: boolean = false;
  isUsernameExisted: boolean = false;
  constructor(
    private route: Router,
    private service: AccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.emailChangeValue();
    this.userNameChangeValue();
    this.loadAcc();
  }
  buildForm() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    });
  }
  userNameChangeValue() {
    this.registerForm.get('username')?.valueChanges.subscribe((x) => {
      for (var i in this.listAcc) {
        if (this.listAcc[i].username == x) {
          this.isUsernameExisted = true;
          break;
        } else {
          this.isUsernameExisted = false;
        }
      }
    });
  }
  emailChangeValue() {
    this.registerForm.get('email')?.valueChanges.subscribe((x) => {
      for (var i in this.listAcc) {
        if (this.listAcc[i].email == x) {
          this.checkExistedEmail = true;
          break;
        } else {
          this.checkExistedEmail = false;
        }
      }
    });
  }
  loadAcc() {
    this.service.getAllAccount().subscribe((res) => {
      this.listAcc = res;
    });
  }

  checkRepeatPassword() {
    this.checkRepeatePass =
      this.registerForm.value.repeatPassword !=
      this.registerForm.value.password;
  }

  register() {
    this.service
      .registerAccount({ ...this.registerForm.value })
      .subscribe((res) => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Register successfully',
          showConfirmButton: false,
          timer: 500,
        });
        this.loadAcc();
        this.route.navigate(['/login']);
      });
  }
}
