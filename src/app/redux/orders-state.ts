import OrderModel from "../models/order.model";


export class OrdersState {
    public orders: OrderModel[] = [];
    public lastOrder: OrderModel = null;
}

export enum OrderActionType {
    ordersDownloaded = "ordersDownloaded",
    orderAdded = "orderAdded",
    lastOrder = "lastOrder"
}

export interface OrderAction {
    type: OrderActionType;
    payload: any;
}

export function ordersDownloadedAction(orders: OrderModel[]): OrderAction {
    return { type: OrderActionType.ordersDownloaded, payload: orders };
}
export function orderAddedAction(order: OrderModel): OrderAction {
    return { type: OrderActionType.orderAdded, payload: order };
}
export function lastOrderAction(lastOrder: OrderModel): OrderAction {
    return { type: OrderActionType.lastOrder, payload: lastOrder };
}

export function ordersReducer(currentState: OrdersState = new OrdersState(), action: OrderAction): OrdersState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case OrderActionType.ordersDownloaded:
            newState.orders = action.payload;
            break;
        case OrderActionType.orderAdded: 
            newState.orders.push(action.payload);
            break;
        case OrderActionType.lastOrder: 
            newState.lastOrder = action.payload;
            break;
    }

    return newState;
}