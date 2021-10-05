import ProductModel from "./product.model";

class CartProductModel {
    public _id: string;
    public productId: string;
    public quantity: number = 1;
    public totalPrice: number;
    public cartId: string;
    public product: ProductModel;
}

export default CartProductModel;