import CartModel from "../models/cart.model";


export class CartState {
    public cart: CartModel = null;
}

export enum CartActionType {
    cartAdded = "cartAdded",
    cartCompleted = "cartCompleted"
}

export interface CartAction {
    type: CartActionType;
    payload: any;
}

export function cartAddedAction(cart: CartModel): CartAction {
    return { type: CartActionType.cartAdded, payload: cart };
}
export function cartCompletedAction(_id: string): CartAction {
    return { type: CartActionType.cartCompleted, payload: _id };
}

export function cartsReducer(currentState: CartState = new CartState(), action: CartAction): CartState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case CartActionType.cartAdded: 
            newState.cart = action.payload;
            break;
        case CartActionType.cartCompleted: {
            newState.cart.completed = true;
            break;
        }
    }

    return newState;
}