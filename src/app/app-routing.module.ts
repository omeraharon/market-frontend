import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminActionsComponent } from './components/admin-actions/admin-actions.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { AddOrderComponent } from './components/orders-area/add-order/add-order.component';
import { Page404Component } from './components/page404/page404.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "logout", component: LogoutComponent},
    {path: "register", component: RegisterComponent},
    {path: "products", canActivate: [AuthGuard], component: ProductListComponent},
    {path: "order", canActivate: [AuthGuard], component: AddOrderComponent},
    {path: "admin-actions", canActivate: [AdminGuard], component: AdminActionsComponent},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
