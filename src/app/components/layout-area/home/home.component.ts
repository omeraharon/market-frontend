import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';
import { Unsubscribe } from 'redux';
import CartModel from 'src/app/models/cart.model';
import { CustomerModel } from 'src/app/models/customer.model';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { cartAddedAction } from 'src/app/redux/carts-state';
import { Router } from '@angular/router';
import OrderModel from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';
import ProductModel from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import * as moment from 'moment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    public user: CustomerModel = store.getState().authState.user;
    public cart: any | CartModel = store.getState().cartState.cart;
    public carts: CartModel = null;
    public orders: OrderModel[] = store.getState().orderState.orders;
    public lastOrder: any | OrderModel = store.getState().orderState.lastOrder;
    public products: ProductModel[] = [];

    private unsubscribeMe: Unsubscribe;

    constructor(
        private myCartService: CartsService, 
        private notify: NotifyService, 
        private myRouter: Router,
        private myOrderService: OrdersService,
        private myProductsService: ProductsService) {}

    public async ngOnInit() {
        try {
            this.products = await this.myProductsService.getAllProducts();

            this.unsubscribeMe = store.subscribe(async () => {
                this.user = store.getState().authState.user;

                if(store.getState().authState.user?.isAdmin) {
                    this.myRouter.navigateByUrl("/products");
                    return;
                }

                if(this.user) { // try catch - אם נגמר התוקף של התוקן אז לתפוס את השגיאה ולנתק את המשתמש
                    try {
                        this.cart = await this.myCartService.getLastCart(this.user._id);
                        this.lastOrder = await this.myOrderService.getLastOrder(this.user._id);
                    }
                    catch(err: any) {
                        if(err.status === 403 || err.status === 401) {
                            this.myRouter.navigateByUrl("/logout"); 
                            return;
                        }
                        this.notify.error(err);
                    }
                }
            });
            this.orders = await this.myOrderService.getAllOrders(); 
        }
        catch(err: any) {
            if(err.status === 403 || err.status === 401) {
                this.myRouter.navigateByUrl("/logout"); 
                return;
            }
            this.notify.error(err);
        }
    }

    public async addCart() {
        try {
            const cartObj = {"customerId": this.user._id}
            this.cart = await this.myCartService.addCart(cartObj);
            this.myRouter.navigateByUrl("/products");
        }
        catch(err: any) {
            if(err.status === 403 || err.status === 401) {
                this.myRouter.navigateByUrl("/logout");
                return;
            }
            this.notify.error(err);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }
}
