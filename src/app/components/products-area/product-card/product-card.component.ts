import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ProductModel from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})


export class ProductCardComponent implements OnInit {

    @Input()
    public product: ProductModel;
    
    public isAdmin: boolean = store.getState().authState.user?.isAdmin;
    public imageUrl: string;

    public ngOnInit() {
        this.imageUrl = `${environment.productsUrl}images/${this.product.imageName}`;
    }
}
