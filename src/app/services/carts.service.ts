import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import CartModel from '../models/cart.model';
import { cartAddedAction, cartCompletedAction } from '../redux/carts-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CartsService {

    constructor(private http: HttpClient) { }

    public async addCart(cart: Object) {
        const addedCart = await this.http.post<CartModel>(environment.cartUrl, cart).toPromise();
        store.dispatch(cartAddedAction(addedCart));
        return addedCart;
    }

    public async getLastCart(_id: string) {
        if (!store.getState().cartState.cart) {
            const cart = await this.http.get<CartModel>(environment.cartUrl + _id).toPromise();
            store.dispatch(cartAddedAction(cart));
        }
        return store.getState().cartState.cart; 
    }

    public async completeCart(_id: string) {
        await this.http.get(`${environment.cartUrl}completed/${_id}`).toPromise();
        store.dispatch(cartCompletedAction(_id));
    }

}
