import { Component, OnInit } from '@angular/core';
import CategoryModel from 'src/app/models/category.model';
import ProductModel from 'src/app/models/product.model';
import {ProductsService} from 'src/app/services/products.service';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-actions',
    templateUrl: './admin-actions.component.html',
    styleUrls: ['./admin-actions.component.css']
})
export class AdminActionsComponent implements OnInit {

    public product: ProductModel | undefined = history.state.data;
    public editStatus: boolean;
    public categories: CategoryModel[] = [];
    public imageVisited: boolean;

    public constructor(private productService: ProductsService, private notify: NotifyService, private myRouter: Router) { }

    async ngOnInit() {
        try {
            this.categories = await this.productService.getAllCategories();
            if(!this.product) {
                this.product = new ProductModel();
            }
            else {
                this.editStatus = true;
            }
        }
        catch(err: any) {
            if(err.status === 403 || err.status === 401) {
                this.myRouter.navigateByUrl("/logout"); 
                return;
            }
            this.notify.error(err);
        }
    }

    public saveImage(event: Event): void {
        this.product.image = (event.target as HTMLInputElement).files;
    }

    public imageBlur(): void {
        this.imageVisited = true;
    }

    public async send() {
        try {
            if(this.editStatus) {
                await this.productService.updateProduct(this.product); 
            }
            else {
                if(!this.product.image) return this.notify.error("חסר תמונה")
                await this.productService.addProduct(this.product);
            }
            this.notify.success("הפעולה בוצעה בהצלחה !");
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

}
