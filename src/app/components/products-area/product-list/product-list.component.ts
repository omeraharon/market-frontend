import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import store from 'src/app/redux/store';
import CategoryModel from 'src/app/models/category.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    public products: ProductModel[];
    public categories: CategoryModel[];
    public isAdmin: boolean;
    constructor(private myProductsService: ProductsService, private notify: NotifyService, private myRouter: Router) { }

    async ngOnInit() {
        try {
            if(!store.getState().authState.user) {
                return this.notify.error("אתה חייב להיות מחובר כדי לגשת לעמוד זה");
            }
            this.isAdmin = store.getState().authState.user?.isAdmin;
            this.categories = await this.myProductsService.getAllCategories();
            this.products = await this.myProductsService.getAllProducts();
        }
        catch (err: any) {
            if(err.status === 403 || err.status === 401) return this.myRouter.navigateByUrl("/logout");
            this.notify.error(err)
        }
    }
    
    public productsByCategory(event: MouseEvent): void {
        const categoryId = (event.target as HTMLButtonElement).value;
        this.products = store.getState().productsState.products.filter(category => category.categoryId === categoryId);
    }

    public searchProducts(event: Event) {
        const searchWord = (event.target as HTMLInputElement).value;
        this.products = store.getState().productsState.products.filter(p => p.name.includes(searchWord));
    }
    
    public allProducts = () => this.products = store.getState().productsState.products;
}
