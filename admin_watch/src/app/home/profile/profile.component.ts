import { ChangeImageService } from './change-image.service';
import { ProductService } from './../../product.service';
import { AccountService } from './../../account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  userId: any;
  updatedUser: any;
  listProd: any;
  listOrder: any;
  listFeedback: any;
  listAccount: any[] = [];
  p = 1;
  initialListProducts: any;
  constructor(
    private service: AccountService,
    private rout: Router,
    private proService: ProductService,
    private changeImageService: ChangeImageService
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    this.loadProfile();
    this.getListProd();
    this.getListOrder();
    this.getListFeedback();
    this.getListAccount();
  }
  checkLogin() {
    if (!localStorage.getItem('userInfo')) {
      this.rout.navigate(['login']);
    }
  }

  loadProfile() {
    let temp = localStorage.getItem('userInfo');
    this.user = temp != null ? JSON.parse(temp) : [];
  }

  editProf() {
    this.service.editProfile(this.user.id, this.user).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        text: 'Cập nhật thành công!',
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem('userInfo');
      localStorage.setItem('userInfo', JSON.stringify(this.user));
      this.changeImageService.change(true);
    });
  }
  getListProd() {
    this.proService.getAllProduct().subscribe((result) => {
      this.listProd = result;
    });
  }
  getListOrder() {
    this.proService.getAllOrder().subscribe((res) => {
      this.listOrder = res;
    });
  }
  getListFeedback() {
    this.proService.getAllFeedback().subscribe((x) => {
      this.listFeedback = x;
    });
  }
  getListAccount() {
    this.service
      .getAllAccount()
      .pipe(
        map((res: any) => {
          this.initialListProducts = [...res];
          return res.map((element: any) => {
            let loginDate = moment(element.loginDate, 'YYYY-MM-DD');
            let nowDate = moment(new Date(), 'YYYY-MM-DD');
            let diff = nowDate.diff(loginDate, 'days');
            element.days = diff;
            return element;
          });
        })
      )
      .subscribe((y) => {
        y.shift();
        this.listAccount = y;
      });
  }
  uploadFile(file: any) {
    this.user.imageUrl = file.target.files[0].name;
    this.editProf();
  }
  deleteUser(x: any) {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: "Bạn sẽ không thể khôi phục lại được!",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        this.service.deleteUser(x.id).subscribe((result) => {
          Swal.fire('Đã xóa!', 'Tài khoản  đã được xóa.', 'success');
          window.location.reload();
        });
      }
    });
  }
  change(user: any) {
    this.service.editProfile(user.id, user).subscribe();
  }
}
