import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import {Routes,RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';
import { HttpClientModule } from '@angular/common/http';
import {RegserviceService} from './regservice.service';
import { SignupComponent } from './signup/signup.component';
import {NgForm} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ExtraComponent } from './extra/extra.component';
import { MenulistComponent } from './menulist/menulist.component';
import { CartComponent } from './cart/cart.component'

const routes : Routes = [ 
  { path: 'home', component: HomeComponent}, 
  { path: 'menu', component: MenuComponent},
  { path: 'orderlist', component: OrderListComponent},
  {path:'signup',component:SignupComponent},
  { path: '', component: HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'menulist',component:MenulistComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    OrderListComponent,
    SignupComponent,
    LoginComponent,
    ExtraComponent,
    MenulistComponent,
    CartComponent,
   ],
  imports: [
    BrowserModule,RouterModule.forRoot(routes),
    FormsModule,    
    HttpClientModule
  ],
  providers: [RegserviceService, CookieService],
  bootstrap: [AppComponent,SignupComponent]
})
export class AppModule { }
