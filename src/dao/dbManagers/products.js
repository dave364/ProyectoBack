import { productModel } from "../modeLs/products.js";

export default class Products {
    constructor() {
        console.log("working products with DB");
    }

    getAll = async () => {
        const options = {
            page: 1,
            limit: 6,
        };

        const products = await productModel.paginate({}, options);
        return products.docs.map(product => product.toObject());
    }

    save = async (product) => {
        const result = await productModel.create(product);
        return result;
    }
}
