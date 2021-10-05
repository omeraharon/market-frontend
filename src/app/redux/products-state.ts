import ProductModel from 'src/app/models/product.model';
import CategoryModel from '../models/category.model';

export class ProductsState {
    public products: ProductModel[] = [];
    public categories: CategoryModel[] = [];
}

export enum ProductActionType {
    productsDownloaded = "productsDownloaded",
    categoriesDownloaded = "categoriesDownloaded",
    productAdded = "productAdded",
    productUpdated = "productUpdated"
}

export interface ProductAction {
    type: ProductActionType;
    payload: any;
}

export function productsDownloadedAction(products: ProductModel[]): ProductAction {
    return { type: ProductActionType.productsDownloaded, payload: products };
}
export function categoriesDownloadedAction(categories: CategoryModel[]): ProductAction {
    return { type: ProductActionType.categoriesDownloaded, payload: categories };
}
export function productAddedAction(product: ProductModel): ProductAction {
    return { type: ProductActionType.productAdded, payload: product };
}
export function productUpdatedAction(product: ProductModel): ProductAction {
    return { type: ProductActionType.productUpdated, payload: product };
}

export function productsReducer(currentState: ProductsState = new ProductsState(), action: ProductAction): ProductsState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case ProductActionType.productsDownloaded:
            newState.products = action.payload;
            break;
        case ProductActionType.categoriesDownloaded:
            newState.categories = action.payload;
            break;
        case ProductActionType.productAdded: 
            newState.products.push(action.payload);
            break;
        case ProductActionType.productUpdated: { 
            const index = newState.products.findIndex(p => p._id === action.payload._id);
            newState.products[index] = action.payload;
            break;
        }
    }

    return newState;
}