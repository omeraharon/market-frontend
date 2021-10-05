import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import CartProductModel from '../models/cart.product.model';
import CategoryModel from '../models/category.model';
import ProductModel from '../models/product.model';
import { cartProductAddedAction, cartProductDeletedAction, cartProductsDownloadedAction } from '../redux/cart-products-state';
import { categoriesDownloadedAction, productAddedAction, productsDownloadedAction, productUpdatedAction } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class CartProductsService {

    constructor(private http: HttpClient) { }

    public async getAllCartProducts(cartId: string) {
        if (store.getState().cartProductsState.cartProducts.length === 0) {
            const cartProducts = await this.http.get<CartProductModel[]>(environment.cartProductsUrl + cartId).toPromise();
            store.dispatch(cartProductsDownloadedAction(cartProducts));
        }
        return store.getState().cartProductsState.cartProducts;
    }

    public async addCartProduct(cartProducts: CartProductModel) {
        const addedCartProduct = await this.http.post<CartProductModel>(environment.cartProductsUrl, cartProducts).toPromise();
        store.dispatch(cartProductAddedAction(addedCartProduct));
        return addedCartProduct;
    }

    public async deleteCartProduct(_id: string) {
        await this.http.delete(environment.cartProductsUrl + _id).toPromise();
        store.dispatch(cartProductDeletedAction(_id));
    }

}
