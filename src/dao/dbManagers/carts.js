import { cartModel } from "../models/carts.js";
import { productModel } from "../modeLs/products.js";
import mongoose from "mongoose";

export default class CartManager {
  constructor() {
    console.log("Working with carts in DB");
  }

  // Obtener todos los carritos de la base de datos
  async getCarts() {
    try {
      const carts = await cartModel.find().populate("products");
      return carts;
    } catch (error) {
      console.log(error);
      throw new Error("Error retrieving carts");
    }
  }

  // Agregar un producto al carrito
  async addToCart(productId) {
    try {
      const product = await productModel.findById(productId);
      if (!product) {
        throw new Error("Product not found");
      }
  
      const newCart = new cartModel({
        products: product._id,
        name: `${product.name}_${product._id}`, // Asignar un nombre único al carrito
        price: product.price,
      });
  
      await this.addCart(newCart.products, newCart.price, newCart.name);
      return "Product added to cart successfully";
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw new Error("Error adding product to cart");
    }
  }
  
  
  
  

  // Agregar un carrito (producto) al carrito existente o crear uno nuevo
  async addCart(productId, price, name) {
    try {
      const existingCart = await cartModel.findOne({ products: productId });
      if (existingCart) {
        existingCart.quantity += 1;
        await existingCart.save();
        console.log("Product added to cart:", existingCart);
        return existingCart;
      } else {
        const newCart = new cartModel({
          products: productId,
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

  // Eliminar un producto del carrito
  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      cart.products = cart.products.filter(
        (product) => product.product.toString() !== productId
      );
      await cart.save();
      return "Product deleted from cart successfully";
    } catch (error) {
      console.error("Error deleting product from cart:", error);
      throw new Error("Error deleting product from cart");
    }
  }

  // Actualizar el carrito con una lista de productos
  async updateCartWithProducts(cartId, products) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      cart.products = products;
      await cart.save();
      return "Cart updated with products successfully";
    } catch (error) {
      console.error("Error updating cart with products:", error);
      throw new Error("Error updating cart with products");
    }
  }

  // Actualizar la cantidad de un producto en el carrito
  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const product = cart.products.find(
        (p) => p.product.toString() === productId
      );
      if (!product) {
        throw new Error("Product not found in cart");
      }
      product.quantity = quantity;
      await cart.save();
      return "Product quantity updated successfully";
    } catch (error) {
      console.error("Error updating product quantity:", error);
      throw new Error("Error updating product quantity");
    }
  }

  // Vaciar el carrito
  async clearCart(cartId) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      cart.products = [];
      await cart.save();
      return "Cart cleared successfully";
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw new Error("Error clearing cart");
    }
  }

  // Verificar si un carrito existe en la base de datos
  async exist(id) {
    const carts = await this.getCarts();
    return carts.find((cart) => cart._id.toString() === id.toString());
  }

  // Actualizar un carrito existente
  async updateCart(id, cart) {
    const cartById = await this.exist(id);
    if (!cartById) return "Cart not found";
    await cartModel.findByIdAndUpdate(id, cart);
    return "Cart updated";
  }

  // Eliminar un carrito
  async deleteCart(id) {
    const cartById = await this.exist(id);
    if (!cartById) return "Cart not found";
    await cartModel.findByIdAndDelete(id);
    return "Cart deleted";
  }
}
