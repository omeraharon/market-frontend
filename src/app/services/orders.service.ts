import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import OrderModel from '../models/order.model';
import { lastOrderAction, orderAddedAction, ordersDownloadedAction } from '../redux/orders-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    constructor(private http: HttpClient) { }

    public async getLastOrder(_id: string) {
        if (!store.getState().orderState.lastOrder) {
            const lastOrder = await this.http.get<OrderModel>(environment.orderUrl + _id).toPromise();
            store.dispatch(lastOrderAction(lastOrder));
        }
        return store.getState().orderState.lastOrder; 
    }

    public async getAllOrders() {
        if (store.getState().orderState.orders.length === 0) {
            const orders = await this.http.get<OrderModel[]>(environment.orderUrl).toPromise();
            store.dispatch(ordersDownloadedAction(orders));
        }
        return store.getState().orderState.orders;
    }

    public async addOrder(order: OrderModel) {
        const addedOrder = await this.http.post<OrderModel>(environment.orderUrl, order).toPromise();
        store.dispatch(orderAddedAction(addedOrder));
        store.dispatch(lastOrderAction(addedOrder));
        return addedOrder;
    }

}
