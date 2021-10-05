import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import OrderModel from 'src/app/models/order.model';
import { lastOrderAction } from 'src/app/redux/orders-state';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
    selector: 'app-add-order',
    templateUrl: './add-order.component.html',
    styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent {
    public order = new OrderModel();
    public today = new Date().toISOString().split('T')[0];

    constructor(private notify: NotifyService, 
                private myOrderService: OrdersService, 
                private myCartService: CartsService,
                private myRouter: Router) { }

    public async addOrder() {
        try {
            const {cart} = store.getState().cartState;
            const {user} = store.getState().authState;
            const {cartProducts} = store.getState().cartProductsState;

            this.order.cartId = cart._id;
            this.order.customerId = user._id;
            this.order.fourDigits = this.order.creditCard.substr(this.order.creditCard.length - 4);
            this.order.totalPrice = cartProducts.reduce((sum, product) => sum + product.totalPrice, 0);

            if(!moment().isSameOrBefore(this.order.deliveryDate, 'day')) 
                return this.notify.error("תאריך לא חוקי");

            const orders = await this.myOrderService.getAllOrders();
            const ordersInDate = orders.filter(o => o.deliveryDate.toString().split('T')[0] === this.order.deliveryDate.toString());
            
            if(ordersInDate.length > 3) 
                return this.notify.error("יום זה תפוס , אנא בחר יום אחר !");

            await store.dispatch(lastOrderAction(this.order));

            await this.myOrderService.addOrder(this.order);
            await this.myCartService.completeCart(this.order.cartId);

            this.notify.success("הזמנתך בוצעה בהצלחה !");
            this.myRouter.navigateByUrl("/home");
        }
        catch(err: any) {
            if(err.status === 403 || err.status === 401) {
                this.myRouter.navigateByUrl("/logout"); 
                return;
            }
            this.notify.error(err);
        }
    }

    public autoComplete() {
        const {user} = store.getState().authState;
        this.order.city = user.city;
        this.order.street = user.street;
    }

}
