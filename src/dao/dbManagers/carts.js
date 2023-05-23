import { cartModel } from "../modeLs/carts.js";

export default class cart {
    constructor() {
        console.log("working carts with DB");
    }

    getAll = async () => {
        const  carts = await cartModel.find().lean();
        return carts;
    }

    save = async (cart) => {
        const result = await cartModel.create(cart);
        return result
    }

    update = async (id, cart) => {
        const result = await cartModel.updateOne({_id: id}, cart)
        return result;
    }
}