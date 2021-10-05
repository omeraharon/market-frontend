import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import CategoryModel from '../models/category.model';
import ProductModel from '../models/product.model';
import { categoriesDownloadedAction, productAddedAction, productsDownloadedAction, productUpdatedAction } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient) { }

    public async getAllCategories() {
        if (store.getState().productsState.categories.length === 0) {
            const categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
            store.dispatch(categoriesDownloadedAction(categories));
        }
        return store.getState().productsState.categories;
    }

    public async getAllProducts() {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch(productsDownloadedAction(products));
        }
        return store.getState().productsState.products;
    }

    public async addProduct(product: ProductModel) {
        const myFormData: FormData = ProductModel.convertToFormData(product);
        const addedProduct = await this.http.post<ProductModel>(environment.productsUrl, myFormData).toPromise();
        store.dispatch(productAddedAction(addedProduct));
        return addedProduct;
    }

    public async updateProduct(product: ProductModel) {
        const myFormData: FormData = ProductModel.convertToFormData(product);
        const updatedProduct = await this.http.put<ProductModel>(environment.productsUrl + product._id, myFormData).toPromise();
        store.dispatch(productUpdatedAction(updatedProduct));
        return updatedProduct;
    }

}
