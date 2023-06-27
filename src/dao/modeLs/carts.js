import mongoose from "mongoose";

// Nombre de la colección de carritos en la base de datos
export const cartCollection = "carts";

// Definición del esquema del carrito
const cartSchema = new mongoose.Schema({
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }]
});

// Creación del modelo de carrito utilizando el esquema
export const cartModel = mongoose.model(cartCollection, cartSchema);
