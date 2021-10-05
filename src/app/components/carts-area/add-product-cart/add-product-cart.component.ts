import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CartProductModel from 'src/app/models/cart.product.model';
import ProductModel from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { CartProductsService } from 'src/app/services/cart.products.service';
import { CartsService } from 'src/app/services/carts.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-add-product-cart',
    templateUrl: './add-product-cart.component.html',
    styleUrls: ['./add-product-cart.component.css']
})
export class AddProductCartComponent implements OnInit {
    @Input()
    public product: ProductModel;

    public cartProduct: CartProductModel = new CartProductModel();

    public constructor(private myCartsService: CartsService, 
                        private notify: NotifyService, 
                        private myCartProductsService: CartProductsService,
                        private myRouter: Router) {}

    public async ngOnInit() {
        try {
            await this.myCartsService.getLastCart(store.getState().authState.user._id); // if user refresh i put the cart to redux
        }
        catch(err: any) {
            if(err.status === 403 || err.status === 401) {
                this.myRouter.navigateByUrl("/logout"); 
                return;
            }
            this.notify.error(err);
        }
    }

    public async addCartProduct() {
        try {
            this.cartProduct.productId = this.product._id;
            this.cartProduct.cartId = store.getState().cartState.cart._id;
            this.cartProduct.totalPrice = this.product.price * this.cartProduct.quantity;
            this.cartProduct.product = this.product
            await this.myCartProductsService.addCartProduct(this.cartProduct);
            this.cartProduct.quantity = 1;
        }
        catch(err: any) {
            if(err.status === 403 || err.status === 401) {
                this.myRouter.navigateByUrl("/logout"); 
                return;
            }
            this.notify.error(err);
        }
    }

}
