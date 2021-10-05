import { CustomerModel } from "./customer.model";

class CartModel {
    public _id: string;
    public customerId: string;
    public dateOfCreationCart: Date;
    public customer: CustomerModel;
    public completed: boolean;
}

export default CartModel;