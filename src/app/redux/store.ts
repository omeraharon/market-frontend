import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { cartProductsReducer } from "./cart-products-state";
import { cartsReducer } from "./carts-state";
import { ordersReducer } from "./orders-state";
import { productsReducer } from "./products-state";

const reducers = combineReducers({ 
    productsState: productsReducer, 
    authState: authReducer,
    cartState: cartsReducer,
    orderState: ordersReducer,
    cartProductsState: cartProductsReducer
});

const store = createStore(reducers);

export default store;