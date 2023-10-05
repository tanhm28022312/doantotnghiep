import { SharedModule } from './../shared/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FeedbackComponent } from './feedback/feedback.component';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


const routes: Routes = [
  {
    path: '',component: HomeComponent,
    children: [
      { path: '', component: ProfileComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'category',
        loadChildren: () =>
          import('../home/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('../home/product/product.module').then((m) => m.ProductModule),
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'order', component: OrderComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'dashboard', component:  DashboardComponent},
      { path: '**', component: ErrorComponent },
    ],
  },
];

@NgModule({
  declarations: [	
    HomeComponent,
    RegisterComponent,
    LoginComponent,  
    ErrorComponent,
    OrderComponent,
    ProfileComponent,
    FeedbackComponent,
    OrderDetailComponent,
    DashboardComponent
   ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,   
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    SharedModule 
  ]
})
export class HomeModule { }
