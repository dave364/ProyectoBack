/*import { cartModel } from "../modeLs/carts.js";

export default class CartManager {
  constructor() {
    console.log("working carts with DB");
  }

  async getCarts() {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (error) {
      console.log(error);
      throw new Error("Error retrieving carts");
    }
  }

    readCarts = async (page,orderBy) => {
        try {
        const order = orderBy == 0 ? {} : {price:orderBy}
        const options = {
            page: page,
            limit: 2,
            sort: order
        };

        const carts = await cartModel.paginate({}, options);
        return carts  
        } catch (error) {
          console.error("Error al leer los productos:", error);
          throw error;
        }
      };


    exist = async (id) => {
        let carts = await this.readCarts();
      return carts.find(prod => prod.id === id)
    }

    updateCarts = async (id, cart) => {
        let cartById = await this.exist(id)
        if(!cartById) return "No Se Encuentra"
        await this.deleteCarts(id)
        let cartOld = await this.readCarts()
        let carts = [{...carts, id : id}, ...cartOld]
        await this.writeProducts(carts)
       return "Se Actualizo El Carrito"


    } 

    deleteCart = async (id) => {
        let carts = await this.readCarts();
        let existCarts = carts.some(prod => prod.id === id)
        if (existCarts) { 
        let filterCarts = carts.filter(prod => prod.id != id)
        await this.writeCarts(filterCarts)
        return "Producto eliminado"
        }
        return "No Existe El Carrito A Eliminar "

    }
}
   */



/*getAll = async () => {
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
}*/

import { cartModel } from "../modeLs/carts.js";
import { productModel } from "../modeLs/products.js";
import mongoose from "mongoose";

export default class CartManager {
  constructor() {
    console.log("Working with carts in DB");
  }

  async getCarts() {
    try {
      const carts = await cartModel.find().populate("productId");
      return carts;
    } catch (error) {
      console.log(error);
      throw new Error("Error retrieving carts");
    }
  }

  async addToCart(productId) {
    try {
      const product = await productModel.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      const newCart = {
        productId: mongoose.Types.ObjectId(productId),
        name: product.name,
        price: product.price,
      };
      await this.addCart(newCart.productId, newCart.price, newCart.name);
      return "Product added to cart successfully";
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw new Error("Error adding product to cart");
    }
  }

  async addCart(productId, price, name) {
    try {
      const existingCart = await cartModel.findOne({ productId });
      if (existingCart) {
        existingCart.quantity += 1;
        await existingCart.save();
        console.log("Product added to cart:", existingCart);
        return existingCart;
      } else {
        const newCart = new cartModel({
          productId,
          price,
          name,
        });
        await newCart.save();
        console.log("Product added to cart:", newCart);
        return newCart;
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw new Error("Error adding product to cart");
    }
  }

  async readCarts(page, orderBy) {
    try {
      const order = orderBy === 0 ? {} : { price: orderBy };
      const options = {
        page: page,
        limit: 2,
        sort: order,
      };

      const carts = await cartModel.paginate({}, options);
      return carts;
    } catch (error) {
      console.error("Error reading carts:", error);
      throw new Error("Error reading carts");
    }
  }

  async exist(id) {
    const carts = await this.readCarts();
    return carts.find((cart) => cart._id.toString() === id.toString());
  }

  async updateCart(id, cart) {
    const cartById = await this.exist(id);
    if (!cartById) return "Cart not found";
    await cartModel.findByIdAndUpdate(id, cart);
    return "Cart updated";
  }

  async deleteCart(id) {
    const cartById = await this.exist(id);
    if (!cartById) return "Cart not found";
    await cartModel.findByIdAndDelete(id);
    return "Cart deleted";
  }
}
