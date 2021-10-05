import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResizeEvent } from 'angular-resizable-element';
import { Unsubscribe } from 'redux';
import CartModel from 'src/app/models/cart.model';
import CartProductModel from 'src/app/models/cart.product.model';
import store from 'src/app/redux/store';
import { CartProductsService } from 'src/app/services/cart.products.service';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-customer-cart',
    templateUrl: './customer-cart.component.html',
    styleUrls: ['./customer-cart.component.css']
})

export class CustomerCartComponent implements OnInit {
    public cartProducts: CartProductModel[] = store.getState().cartProductsState.cartProducts;
    public cart: CartModel | any;
    public totalCartPrice: number = 0;
    public customerId: string = store.getState().authState.user._id;
    public style: object = {};
    public mark: boolean;

    @Input()
    public orderShow: boolean; // to hide delete button in order page
    public searchMark: boolean;

    constructor(private notify: NotifyService, 
                private myCartProductsService: CartProductsService, 
                private myCartsService: CartsService,
                private myRouter: Router) { }

    public async ngOnInit() {
        try {
            this.cart = await this.myCartsService.getLastCart(this.customerId);
            this.cartProducts = await this.myCartProductsService.getAllCartProducts(this.cart._id);
            this.totalCartPrice = this.cartProducts?.reduce((sum, product) => sum + product.totalPrice, 0);
            
            store.subscribe(() => {
                this.totalCartPrice = this.cartProducts.reduce((sum, product) => sum + product.totalPrice, 0);
                this.cartProducts = store.getState().cartProductsState.cartProducts
            });
        }
        catch(err: any) {
            if(err.status === 403 || err.status === 401) {
                this.myRouter.navigateByUrl("/logout"); 
                return;
            }
            this.notify.error(err);
        }
    }

    public searchProducts(event: Event) {
        const searchWord = (event.target as HTMLInputElement).value;
        this.cartProducts = store.getState().cartProductsState.cartProducts.filter(p => p.product.name.includes(searchWord));
        this.mark = true;
        if(!searchWord) {
            this.mark = false;
        }
    }

    public async deleteCartProduct(productId: string) {
        await this.myCartProductsService.deleteCartProduct(productId);
    }

    public deleteAllCartProducts() {
        this.cartProducts.map(async product => await this.myCartProductsService.deleteCartProduct(product._id))
    }

    validate(event: ResizeEvent): boolean {
        const MIN_DIMENSIONS_PX: number = 50;
        if (
            event.rectangle.width &&
            event.rectangle.height &&
            (event.rectangle.width < MIN_DIMENSIONS_PX ||
                event.rectangle.height < MIN_DIMENSIONS_PX)
        ) {
            return false;
        }
        return true;
    }

    onResizeEnd(event: ResizeEvent): void {
        this.style = {
            width: `${event.rectangle.width}px`,
            height: `90%`,
        };
    }
}
