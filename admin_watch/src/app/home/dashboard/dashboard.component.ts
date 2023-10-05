import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderDetailService } from './../order/order-detail.service';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from './../../product.service';
import { forkJoin } from 'rxjs';
import { AccountService } from './../../account.service';
import { OrderService } from './../../order.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  todayRevenue = 0;
  customer = 0;
  product = 0;
  order = 0;
  top3Products: any = [];
  chartData: any = [];
  HUNDRED_PERCENT = 20000000;
  formSelect: FormGroup;
  BEST_SELLER_PRODUCTS: any = [];
  data: any;
  constructor(
    private productService: ProductService,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private orderDetail: OrderDetailService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.getAllInfo();
    this.buildForm();
    this.monthChangeValue();
  }

  buildForm() {
    this.formSelect = this.fb.group({
      month: ['3'],
    });
  }

  monthChangeValue() {
    this.formSelect.controls['month'].valueChanges.subscribe((value: any) => {
      this.getListRevenueEachMonth(value, this.data.orders);
    });
  }
  getAllInfo() {
    forkJoin({
      orders: this.accountService.getAllOrder() ?? [],
      accounts: this.accountService.getAllAccount(),
      products: this.productService.getAllProduct(),
      categories: this.categoryService.getAllCategory(),
      orderDetails: this.orderDetail.getAllOrderDetails(),
    }).subscribe((res: any) => {
      this.data = res;
      //lấy tổng hàng
      this.product = res.products?.length ?? 0;
      //lấy tổng số user
      this.customer =
        res.accounts.filter((x: any) => x.role == 'Customer').length ?? 0;

      this.order = res.orders.length;
      // Lấy ngày hiện tại
      const today = new Date().toISOString().split('T')[0];

      // Sử dụng reduce để tính tổng tiền trong ngày
      this.todayRevenue = res.orders
        .filter((order: any) => order.createdDate.split('T')[0] === today) // Lọc ra các đơn hàng trong ngày
        .reduce(
          (total: any, order: { totalMoney: any }) => total + order.totalMoney,
          0
        ); // Tính tổng tiền

      //lấy danh sách sản phẩm được bán nhiều nhất
      // Tạo một đối tượng Map để theo dõi số lượng mỗi sản phẩm
      const productCountMap = new Map();

      // Duyệt qua mảng sản phẩm và đếm số lượng cho mỗi sản phẩm
      res.orderDetails.forEach((product: any) => {
        const productId = product.productId;
        if (productCountMap.has(productId)) {
          productCountMap.set(
            productId,
            productCountMap.get(productId) + product.quantity
          );
        } else {
          productCountMap.set(productId, product.quantity);
        }
      });

      // Sắp xếp danh sách sản phẩm theo số lượng giảm dần
      const sortedProducts = [...productCountMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .map((entry) => ({
          productId: entry[0],
          totalQuantity: entry[1],
        }));

      // Lấy ra 3 sản phẩm có số lượng lớn nhất
      this.top3Products = sortedProducts.slice(0, 3);
      this.top3Products = this.top3Products.map((result: any) => {
        result.product = res.products.find(
          (x: any) => x.id == result.productId
        );
        return result;
      });

      this.getListRevenueEachMonth(3, this.data.orders);
    });
  }

  getListRevenueEachMonth(month: number, orders: any) {
    this.chartData = [];
    const currentMonth = new Date().getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
    //lấy danh sách doanh thu từng tháng
    for (let i = month; i >= 1; i--) {
      this.chartData.push({
        month: currentMonth - i + 1,
        value:
          (this.getPreviousRevenue(i, orders) / this.HUNDRED_PERCENT) * 100,
      });
    }
  }

  getPreviousRevenue(numberMonth: any, orders: any): number {
    // Lấy ngày hiện tại
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0

    // Tính tháng và năm của tháng trước
    let previousMonth = currentMonth - numberMonth;
    let previousYear = currentYear;

    // Nếu tháng trước là tháng 0 (tháng 1), thì chuyển về tháng 12 của năm trước
    if (previousMonth === 0) {
      previousMonth = 12;
      previousYear -= 1;
    }

    // Tính tổng tiền cho tháng trước
    let totalMoneyForPreviousMonth = 0;

    orders.forEach((order: any) => {
      const orderDate = new Date(order.createdDate);
      const orderYear = orderDate.getFullYear();
      const orderMonth = orderDate.getMonth() + 1;

      if (orderYear === previousYear && orderMonth === previousMonth) {
        totalMoneyForPreviousMonth += order.totalMoney;
      }
    });
    return totalMoneyForPreviousMonth;
  }
}
