class OrderModel {
    public _id: string;
    public customerId: string;
    public cartId: string;
    public totalPrice: number;
    public city: string;
    public street: string;
    public deliveryDate: Date;
    public orderDate: Date;
    public fourDigits: string;
    public creditCard: string;
}

export default OrderModel;