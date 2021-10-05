import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { ResizableModule } from 'angular-resizable-element';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { CustomerCartComponent } from './components/carts-area/customer-cart/customer-cart.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddProductCartComponent } from './components/carts-area/add-product-cart/add-product-cart.component';
import { AddOrderComponent } from './components/orders-area/add-order/add-order.component';
import { Page404Component } from './components/page404/page404.component';
import { AdminActionsComponent } from './components/admin-actions/admin-actions.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    AuthMenuComponent,
    RegisterComponent,
    FooterComponent,
    ProductListComponent,
    CustomerCartComponent,
    ProductCardComponent,
    AddProductCartComponent,
    AddOrderComponent,
    Page404Component,
    AdminActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ResizableModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor, 
    multi: true 
  }],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
