import CartProductModel from "../models/cart.product.model";


export class CartProductsState {
    public cartProducts: CartProductModel[] = [];
}

export enum CartProductActionType {
    cartProductsDownloaded = "cartProductsDownloaded",
    cartProductAdded = "cartProductAdded",
    cartProductDeleted = "cartProductDeleted"
}

export interface CartProductAction {
    type: CartProductActionType;
    payload: any;
}

export function cartProductsDownloadedAction(cartProducts: CartProductModel[]): CartProductAction {
    return { type: CartProductActionType.cartProductsDownloaded, payload: cartProducts };
}
export function cartProductAddedAction(cartProduct: CartProductModel): CartProductAction {
    return { type: CartProductActionType.cartProductAdded, payload:cartProduct };
}
export function cartProductDeletedAction(_id: string): CartProductAction {
    return { type: CartProductActionType.cartProductDeleted, payload: _id };
}

export function cartProductsReducer(currentState: CartProductsState = new CartProductsState(), action: CartProductAction): CartProductsState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case CartProductActionType.cartProductsDownloaded:
            newState.cartProducts = action.payload;
            break;
        case CartProductActionType.cartProductAdded: 
            newState.cartProducts.push(action.payload);
            break;
        case CartProductActionType.cartProductDeleted: { 
            const index = newState.cartProducts.findIndex(p => p._id === action.payload);
            newState.cartProducts.splice(index, 1);
            break;
        }
    }

    return newState;
}